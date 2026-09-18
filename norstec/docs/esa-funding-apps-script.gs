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
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (!verifyRecaptcha_(data.recaptchaToken)) {
      return json_({ ok: false, error: "recaptcha" });
    }

    const error = validate_(data);
    if (error) {
      return json_({ ok: false, error: error });
    }

    const attachments = (data.attachments || []).map(function (file) {
      return Utilities.newBlob(
        Utilities.base64Decode(file.data),
        file.mimeType,
        sanitizeFileName_(file.name)
      );
    });

    MailApp.sendEmail({
      to: prop_("TO_EMAIL"),
      replyTo: String(data.email).trim(),
      subject: "ESA funding application – " + clean_(data.applicantName, 200),
      htmlBody: buildEmail_(data),
      attachments: attachments,
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
    "phone",
    "institution",
    "activityName",
    "activityDescription",
    "startDate",
    "endDate",
    "esaCovers",
    "esaNotCovers",
    "budgetExplanation",
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
  if (!Array.isArray(data.budget) || !data.budget.length) return "missing_budget";

  const files = data.attachments || [];
  if (files.length > MAX_FILES) return "too_many_files";

  let totalBytes = 0;
  for (let i = 0; i < files.length; i++) {
    if (ALLOWED_TYPES.indexOf(files[i].mimeType) === -1) return "invalid_file_type";
    totalBytes += Math.floor((String(files[i].data).length * 3) / 4);
  }
  if (totalBytes > MAX_TOTAL_BYTES) return "files_too_large";

  return null;
}

function buildEmail_(data) {
  const budget = data.budget.map(function (row) {
    return { item: clean_(row.item, 300), amount: toNumber_(row.amount) };
  });
  const budgetTotal = budget.reduce(function (sum, row) {
    return sum + row.amount;
  }, 0);
  const otherSupportAmount = toNumber_(data.otherSupportAmount);
  const remainingNeed = Math.max(0, budgetTotal - otherSupportAmount);
  const isAssociation = data.applicantType === "association";

  const rows = [
    ["Applicant type", isAssociation ? "Student association" : "Student"],
    ["1. Applicant", data.applicantName],
    ["2. Contact person", data.contactPerson],
    ["Email", data.email],
    ["Phone", data.phone],
    ["3. Place of study", data.institution],
    ["4. Organization number", isAssociation ? data.orgNumber : "–"],
    ["6. Activity", data.activityName],
    ["Dates", data.startDate + " – " + data.endDate],
    ["Link", data.activityUrl || "–"],
    ["Description", data.activityDescription],
    ["What ESA covers", data.esaCovers],
    ["What ESA does not cover", data.esaNotCovers],
    ["10. Expected number of students", data.expectedStudents],
  ];

  const budgetRows = budget
    .map(function (row) {
      return "<tr><td>" + escape_(row.item) + "</td><td align='right'>" + nok_(row.amount) + "</td></tr>";
    })
    .join("");

  return (
    "<h2>ESA funding application</h2>" +
    "<p>Reply to this email to answer the applicant. Remember to ask for bank account number" +
    " (and receipts if they are not attached).</p>" +
    table_(rows) +
    "<h3>8. Budget (costs not covered by ESA)</h3>" +
    "<table cellpadding='6' border='1' style='border-collapse:collapse'>" +
    budgetRows +
    "<tr><td><b>Total</b></td><td align='right'><b>" + nok_(budgetTotal) + "</b></td></tr></table>" +
    table_([
      ["How the amount was calculated", data.budgetExplanation],
      ["9. Support from others", data.otherSupport || "–"],
      ["Support from others (NOK)", nok_(otherSupportAmount)],
      ["Remaining funding need", nok_(remainingNeed)],
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

function sanitizeFileName_(name) {
  return clean_(name, 120).replace(/[^\w.\- ]/g, "_") || "attachment";
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
