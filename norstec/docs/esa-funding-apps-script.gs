/**
 * NORSTEC – ESA funding applications
 *
 * Receives applications from https://norstec.no/esa-funding, verifies reCAPTCHA Enterprise and
 * emails the application (with attachments) to economy@norstec.no. Nothing is stored.
 *
 * Script properties (Project Settings → Script properties):
 *   RECAPTCHA_PROJECT_ID  Google Cloud project ID that owns the reCAPTCHA key
 *   RECAPTCHA_API_KEY     API key restricted to the reCAPTCHA Enterprise API
 *   RECAPTCHA_SITE_KEY    Same value as NEXT_PUBLIC_RECAPTCHA_ESA_FUNDING_KEY
 *   TO_EMAIL              economy@norstec.no
 *
 * See docs/ESA_FUNDING_SETUP.md for deployment.
 */

const RECAPTCHA_ACTION = "esa_funding";
const MIN_SCORE = 0.5;
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const MAX_BODY_CHARS = 15 * 1024 * 1024;
const MAX_FIELD_CHARS = 5000;
const MAX_SUBMISSIONS_PER_HOUR = 3;

// Attachments are identified by their actual bytes, never by the name or type the browser sends.
const FILE_SIGNATURES = [
  { ext: "pdf", mimeType: "application/pdf", bytes: [0x25, 0x50, 0x44, 0x46, 0x2d] }, // %PDF-
  { ext: "png", mimeType: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { ext: "jpg", mimeType: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
];

// PDF features that can run code or carry hidden files. PDFs containing them are rejected.
const DANGEROUS_PDF_NAMES = /\/(JavaScript|JS|Launch|EmbeddedFiles?|RichMedia|XFA|SubmitForm|ImportData|GoToR|GoToE)\b/;

function doPost(e) {
  try {
    if (!e || !e.postData || e.postData.contents.length > MAX_BODY_CHARS) {
      return json_({ ok: false, error: "too_large" });
    }

    const data = JSON.parse(e.postData.contents);
    if (!data || typeof data !== "object") {
      return json_({ ok: false, error: "invalid" });
    }

    if (!verifyRecaptcha_(data.recaptchaToken)) {
      return json_({ ok: false, error: "recaptcha" });
    }

    const error = validate_(data);
    if (error) {
      return json_({ ok: false, error: error });
    }

    const attachments = buildAttachments_(data.attachments || []);
    if (attachments.error) {
      return json_({ ok: false, error: attachments.error });
    }

    if (isRateLimited_(data.email)) {
      return json_({ ok: false, error: "rate_limited" });
    }

    MailApp.sendEmail({
      to: prop_("TO_EMAIL"),
      replyTo: String(data.email).trim(),
      subject: "ESA funding application – " + clean_(data.applicantName, 200).replace(/[\r\n]+/g, " "),
      htmlBody: buildEmail_(data),
      attachments: attachments.blobs,
      name: "NORSTEC website",
    });

    return json_({ ok: true });
  } catch (err) {
    // Log only the error, never the application itself.
    console.error("ESA funding submission failed: " + err);
    return json_({ ok: false, error: "server" });
  }
}

function verifyRecaptcha_(token) {
  if (!token) return false;

  const url =
    "https://recaptchaenterprise.googleapis.com/v1/projects/" +
    prop_("RECAPTCHA_PROJECT_ID") +
    "/assessments?key=" +
    prop_("RECAPTCHA_API_KEY");

  const response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    muteHttpExceptions: true,
    payload: JSON.stringify({
      event: {
        token: token,
        siteKey: prop_("RECAPTCHA_SITE_KEY"),
        expectedAction: RECAPTCHA_ACTION,
      },
    }),
  });

  if (response.getResponseCode() !== 200) return false;

  const result = JSON.parse(response.getContentText());
  return (
    result.tokenProperties &&
    result.tokenProperties.valid === true &&
    result.tokenProperties.action === RECAPTCHA_ACTION &&
    result.riskAnalysis &&
    result.riskAnalysis.score >= MIN_SCORE
  );
}

function validate_(data) {
  const required = [
    "applicantName",
    "contactPerson",
    "email",
    "institution",
    "activityName",
    "activityDescription",
    "esaCovers",
    "costs",
  ];

  for (let i = 0; i < required.length; i++) {
    if (!String(data[required[i]] || "").trim()) return "missing_" + required[i];
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim())) return "invalid_email";

  if (data.applicantType === "association") {
    if (!/^\d{9}$/.test(String(data.orgNumber || "").replace(/\s/g, ""))) return "invalid_org";
  }

  if (!(Number(data.amountRequested) > 0)) return "invalid_amount";
  if (!(Number(data.expectedStudents) >= 1)) return "invalid_students";

  if (["student", "association"].indexOf(data.applicantType) === -1) return "invalid_type";

  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    const value = data[keys[i]];
    if (typeof value === "string" && value.length > MAX_FIELD_CHARS) return "too_long_" + keys[i];
  }

  if (data.attachments !== undefined && !Array.isArray(data.attachments)) return "invalid_files";

  return null;
}

function buildAttachments_(files) {
  if (files.length > MAX_FILES) return { error: "too_many_files" };

  const blobs = [];
  let totalBytes = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file || typeof file.data !== "string") return { error: "invalid_file" };

    let bytes;
    try {
      bytes = Utilities.base64Decode(file.data);
    } catch (err) {
      return { error: "invalid_file" };
    }

    totalBytes += bytes.length;
    if (totalBytes > MAX_TOTAL_BYTES) return { error: "files_too_large" };

    const type = detectFileType_(bytes);
    if (!type) return { error: "invalid_file_type" };

    if (type.ext === "pdf" && hasDangerousPdfContent_(bytes)) {
      return { error: "unsafe_pdf" };
    }

    // The file name is rebuilt from scratch, with the extension taken from the detected type.
    const baseName = String(file.name || "")
      .replace(/\.[^.]*$/, "")
      .replace(/[^A-Za-z0-9 _-]/g, "")
      .trim()
      .slice(0, 60);
    const name = (i + 1) + "-" + (baseName || "attachment") + "." + type.ext;

    blobs.push(Utilities.newBlob(bytes, type.mimeType, name));
  }

  return { blobs: blobs };
}

function detectFileType_(bytes) {
  for (let i = 0; i < FILE_SIGNATURES.length; i++) {
    const signature = FILE_SIGNATURES[i];
    if (bytes.length < signature.bytes.length) continue;

    let matches = true;
    for (let j = 0; j < signature.bytes.length; j++) {
      if ((bytes[j] & 0xff) !== signature.bytes[j]) {
        matches = false;
        break;
      }
    }
    if (matches) return signature;
  }
  return null;
}

function hasDangerousPdfContent_(bytes) {
  // Decode #xx escapes in PDF names (e.g. /J#61vaScript) before checking.
  const text = Utilities.newBlob(bytes)
    .getDataAsString("ISO-8859-1")
    .replace(/#([0-9A-Fa-f]{2})/g, function (_, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });
  return DANGEROUS_PDF_NAMES.test(text);
}

function isRateLimited_(email) {
  const cache = CacheService.getScriptCache();
  const key = "esa:" + String(email).trim().toLowerCase();
  const count = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(count), 60 * 60);
  return count > MAX_SUBMISSIONS_PER_HOUR;
}

function buildEmail_(data) {
  const isAssociation = data.applicantType === "association";

  return (
    "<h2>ESA funding application</h2>" +
    "<p>Reply to this email to answer the applicant. Remember to ask for bank account number" +
    " (and receipts if they are not attached).</p>" +
    table_([
      ["Applicant type", isAssociation ? "Student association" : "Student"],
      ["1. Applicant", data.applicantName],
      ["2. Contact person", data.contactPerson],
      ["Email", data.email],
      ["3. Place of study", data.institution],
      ["4. Organization number", isAssociation ? data.orgNumber : "–"],
      ["6. Activity", data.activityName],
      ["Description", data.activityDescription],
      ["10. Expected number of students", data.expectedStudents],
      ["What ESA covers", data.esaCovers],
      ["8. Costs not covered by ESA (budget)", data.costs],
      ["9. Support from others", data.otherSupport || "None"],
      ["7. Amount applied for", nok_(toNumber_(data.amountRequested))],
      ["Attachments", String((data.attachments || []).length)],
    ])
  );
}

function table_(rows) {
  return (
    "<table cellpadding='6' style='border-collapse:collapse;margin:12px 0'>" +
    rows
      .map(function (row) {
        return (
          "<tr><td valign='top'><b>" + escape_(row[0]) + "</b></td><td style='white-space:pre-wrap'>" +
          escape_(clean_(row[1], 5000)) + "</td></tr>"
        );
      })
      .join("") +
    "</table>"
  );
}

function clean_(value, maxLength) {
  return String(value === undefined || value === null ? "" : value).trim().slice(0, maxLength);
}

function escape_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toNumber_(value) {
  const n = Number(value);
  return isFinite(n) ? n : 0;
}

function nok_(value) {
  return value.toLocaleString("nb-NO") + " NOK";
}

function prop_(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) throw new Error("Missing script property " + key);
  return value;
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
