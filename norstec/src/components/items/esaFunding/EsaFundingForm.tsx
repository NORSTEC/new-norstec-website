"use client";

import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_ESA_FUNDING_APPS_SCRIPT_URL!;
const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_ESA_FUNDING_KEY!;

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const INSTITUTIONS = [
  "NTNU",
  "University of Oslo (UiO)",
  "University of Bergen (UiB)",
  "UiT The Arctic University of Norway",
  "University of Stavanger (UiS)",
  "University of Agder (UiA)",
  "University of South-Eastern Norway (USN)",
  "Norwegian University of Life Sciences (NMBU)",
  "Oslo Metropolitan University (OsloMet)",
  "Western Norway University of Applied Sciences (HVL)",
  "Nord University",
  "University of Inland Norway (INN)",
  "BI Norwegian Business School",
  "NHH Norwegian School of Economics",
];

type ApplicantType = "student" | "association";

type BudgetRow = {
  id: number;
  item: string;
  amount: string;
};

type Attachment = {
  name: string;
  mimeType: string;
  size: number;
  data: string;
};

type Props = {
  maxAmount: number;
};

const inputClass =
  "w-full rounded-xl border-2 border-moody/20 bg-transparent px-4 py-3 focus:outline-none focus:border-moody transition-colors";

const dateInputClass = `${inputClass} in-data-[theme=dark]:scheme-dark`;

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-moody px-4 py-2 text-sm font-semibold tracking-wide transition hover:bg-moody hover:text-egg cursor-pointer";

const formatNok = (value: number) => `${new Intl.NumberFormat("nb-NO").format(value)} NOK`;

const toNumber = (value: string) => {
  const parsed = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const readAsBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold uppercase tracking-wide">
        {label} {required && <span className="text-copper">*</span>}
      </span>
      {children}
      {hint && <span className="text-sm text-moody/70">{hint}</span>}
    </label>
  );
}

function FormGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-h3 uppercase mb-4">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function EsaFundingForm({ maxAmount }: Props) {
  const [applicantType, setApplicantType] = useState<ApplicantType>("student");
  const [applicantName, setApplicantName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [orgNumber, setOrgNumber] = useState("");

  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activityUrl, setActivityUrl] = useState("");
  const [expectedStudents, setExpectedStudents] = useState("1");

  const [esaCovers, setEsaCovers] = useState("");
  const [esaNotCovers, setEsaNotCovers] = useState("");

  const [budget, setBudget] = useState<BudgetRow[]>([{ id: 0, item: "", amount: "" }]);
  const [budgetExplanation, setBudgetExplanation] = useState("");
  const [otherSupport, setOtherSupport] = useState("");
  const [otherSupportAmount, setOtherSupportAmount] = useState("");
  const [amountRequested, setAmountRequested] = useState("");

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [fileError, setFileError] = useState("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isAssociation = applicantType === "association";
  const budgetTotal = budget.reduce((sum, row) => sum + toNumber(row.amount), 0);
  const remainingNeed = Math.max(0, budgetTotal - toNumber(otherSupportAmount));
  const requested = toNumber(amountRequested);

  const updateBudgetRow = (id: number, key: "item" | "amount", value: string) => {
    setBudget((rows) => rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  };

  const addBudgetRow = () => {
    setBudget((rows) => [
      ...rows,
      { id: Math.max(...rows.map((row) => row.id)) + 1, item: "", amount: "" },
    ]);
  };

  const removeBudgetRow = (id: number) => {
    setBudget((rows) => (rows.length > 1 ? rows.filter((row) => row.id !== id) : rows));
  };

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    setFileError("");

    if (!files.length) return;

    if (files.some((file) => !ACCEPTED_TYPES.includes(file.type))) {
      setFileError("Only PDF, JPG and PNG files are allowed.");
      return;
    }

    if (attachments.length + files.length > MAX_FILES) {
      setFileError(`You can attach up to ${MAX_FILES} files.`);
      return;
    }

    const totalBytes =
      attachments.reduce((sum, file) => sum + file.size, 0) +
      files.reduce((sum, file) => sum + file.size, 0);

    if (totalBytes > MAX_TOTAL_BYTES) {
      setFileError("The attachments can be at most 10 MB in total.");
      return;
    }

    try {
      const read = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          mimeType: file.type,
          size: file.size,
          data: await readAsBase64(file),
        }))
      );
      setAttachments((prev) => [...prev, ...read]);
    } catch {
      setFileError("Could not read the file. Please try again.");
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const grecaptcha = window.grecaptcha;

      if (!grecaptcha?.enterprise) {
        throw new Error("reCAPTCHA Enterprise not loaded");
      }

      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        grecaptcha.enterprise!.ready(async () => {
          try {
            const token = await grecaptcha.enterprise!.execute(RECAPTCHA_KEY, {
              action: "esa_funding",
            });

            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      });

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          applicantType,
          applicantName,
          contactPerson: isAssociation ? contactPerson : applicantName,
          email,
          phone,
          institution,
          orgNumber: isAssociation ? orgNumber : "",
          activityName,
          activityDescription,
          startDate,
          endDate,
          activityUrl,
          expectedStudents: toNumber(expectedStudents),
          esaCovers,
          esaNotCovers,
          budget: budget
            .filter((row) => row.item.trim() || row.amount.trim())
            .map((row) => ({ item: row.item, amount: toNumber(row.amount) })),
          budgetExplanation,
          otherSupport,
          otherSupportAmount: toNumber(otherSupportAmount),
          amountRequested: requested,
          attachments: attachments.map(({ name, mimeType, data }) => ({ name, mimeType, data })),
          recaptchaToken,
        }),
      });

      const result = (await response.json()) as { ok?: boolean };

      if (!result.ok) {
        throw new Error("Submission rejected");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border p-6 space-y-2">
        <p className="font-semibold uppercase tracking-wide">Application sent!</p>
        <p className="text-sm text-moody/70">
          Thank you for your application. You will hear from economy@norstec.no at {email}.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_KEY}`}
        strategy="afterInteractive"
      />
      <form onSubmit={handleSubmit} className="space-y-12">
        <h2 className="text-h2">
          Application form
          <span aria-hidden className="star-inline" />
        </h2>

        <FormGroup title="Applicant">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
            {(
              [
                { value: "student", label: "Student" },
                { value: "association", label: "Student association" },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={[
                  "rounded-xl border-2 px-4 py-3 text-center font-semibold tracking-wide transition-colors cursor-pointer",
                  applicantType === option.value
                    ? "border-moody bg-moody text-egg"
                    : "border-moody/20 hover:border-moody",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="applicantType"
                  value={option.value}
                  checked={applicantType === option.value}
                  onChange={() => setApplicantType(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>

          <Field label={isAssociation ? "Name of association" : "Full name"} required>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          {isAssociation && (
            <>
              <Field label="Contact person" required>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Organization number" required>
                <input
                  type="text"
                  inputMode="numeric"
                  value={orgNumber}
                  onChange={(e) => setOrgNumber(e.target.value)}
                  className={inputClass}
                  pattern="\s*(\d\s*){9}"
                  title="The organization number has 9 digits."
                  required
                />
              </Field>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
            </Field>

            <Field label="Phone" required>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                required
              />
            </Field>
          </div>

          <Field label="University, college or place of study" required>
            <input
              type="text"
              list="esa-funding-institutions"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className={inputClass}
              required
            />
            <datalist id="esa-funding-institutions">
              {INSTITUTIONS.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </Field>
        </FormGroup>

        <FormGroup title="Activity">
          <Field label="Name of course or conference" required>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Start date" required>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={dateInputClass}
                required
              />
            </Field>

            <Field label="End date" required>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className={dateInputClass}
                required
              />
            </Field>
          </div>

          <Field label="Link to the course or conference">
            <input
              type="url"
              value={activityUrl}
              onChange={(e) => setActivityUrl(e.target.value)}
              className={inputClass}
              placeholder="https://"
            />
          </Field>

          <Field label="Description of the activity" required>
            <textarea
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder="What is the course or conference, and what will you do there?"
              required
            />
          </Field>

          <Field label="Expected number of students" required>
            <input
              type="number"
              min={1}
              step={1}
              value={expectedStudents}
              onChange={(e) => setExpectedStudents(e.target.value)}
              className={inputClass}
              required
            />
          </Field>
        </FormGroup>

        <FormGroup title="ESA funding">
          <Field label="What does ESA cover?" required>
            <textarea
              value={esaCovers}
              onChange={(e) => setEsaCovers(e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y`}
              placeholder="E.g. course fee, accommodation and meals."
              required
            />
          </Field>

          <Field label="What does ESA not cover?" required>
            <textarea
              value={esaNotCovers}
              onChange={(e) => setEsaNotCovers(e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y`}
              placeholder="E.g. travel to and from the course."
              required
            />
          </Field>
        </FormGroup>

        <FormGroup title="Budget">
          <div className="space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wide">
              Costs not covered by ESA <span className="text-copper">*</span>
            </span>

            {budget.map((row, index) => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_8rem_auto] sm:grid-cols-[1fr_10rem_auto] gap-3 items-center"
              >
                <input
                  type="text"
                  value={row.item}
                  onChange={(e) => updateBudgetRow(row.id, "item", e.target.value)}
                  className={inputClass}
                  placeholder="E.g. flight Oslo–Brussels"
                  aria-label={`Budget item ${index + 1}`}
                  required
                />
                <input
                  type="number"
                  min={0}
                  value={row.amount}
                  onChange={(e) => updateBudgetRow(row.id, "amount", e.target.value)}
                  className={inputClass}
                  placeholder="NOK"
                  aria-label={`Amount for budget item ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeBudgetRow(row.id)}
                  disabled={budget.length === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer transition-opacity disabled:opacity-30 disabled:cursor-default"
                  aria-label={`Remove budget item ${index + 1}`}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={addBudgetRow} className={secondaryButtonClass}>
                <span className="material-symbols-outlined">add</span>
                Add cost
              </button>
              <p className="font-semibold">Total: {formatNok(budgetTotal)}</p>
            </div>
          </div>

          <Field label="How was the amount calculated?" required>
            <textarea
              value={budgetExplanation}
              onChange={(e) => setBudgetExplanation(e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y`}
              required
            />
          </Field>

          <Field
            label="Support from others"
            hint="Support you have received or applied for from others, e.g. your university or student association."
          >
            <textarea
              value={otherSupport}
              onChange={(e) => setOtherSupport(e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y`}
            />
          </Field>

          <Field label="Total support from others (NOK)">
            <input
              type="number"
              min={0}
              value={otherSupportAmount}
              onChange={(e) => setOtherSupportAmount(e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="rounded-2xl border p-6 space-y-1">
            <p className="text-sm font-semibold uppercase tracking-wide">Remaining funding need</p>
            <p className="text-h3">{formatNok(remainingNeed)}</p>
          </div>

          <Field
            label="Amount applied for (NOK)"
            required
            hint={`We can normally grant up to ${formatNok(maxAmount)} per applicant.`}
          >
            <input
              type="number"
              min={1}
              value={amountRequested}
              onChange={(e) => setAmountRequested(e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          {requested > maxAmount && (
            <p className="text-sm text-copper">
              You are applying for more than {formatNok(maxAmount)}. Explain why in the budget
              explanation.
            </p>
          )}
          {requested > remainingNeed && budgetTotal > 0 && (
            <p className="text-sm text-copper">
              You are applying for more than your remaining funding need.
            </p>
          )}
        </FormGroup>

        <FormGroup title="Attachments">
          <p className="text-sm text-moody/70">
            Optional. For example confirmation from ESA, budget or receipts you already have. PDF,
            JPG or PNG, up to {MAX_FILES} files and 10 MB in total. Receipts are required before
            payment and can also be sent to economy@norstec.no later.
          </p>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleFiles}
            className="block w-full text-sm file:mr-4 file:rounded-xl file:border-2 file:border-moody file:bg-moody file:text-egg file:px-4 file:py-2 file:font-semibold file:tracking-wide file:cursor-pointer file:transition hover:file:bg-transparent hover:file:text-moody"
          />

          {fileError && <p className="text-sm text-red-500">{fileError}</p>}

          {attachments.length > 0 && (
            <ul className="space-y-2">
              {attachments.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-xl border-2 border-moody/20 px-4 py-2 text-sm"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="flex items-center cursor-pointer"
                    aria-label={`Remove ${file.name}`}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </FormGroup>

        <div className="space-y-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-moody"
              required
            />
            <span className="text-sm">
              I confirm that the information is correct, and that NORSTEC may process it as
              described in the{" "}
              <Link href="/privacy" className="underline">
                privacy policy
              </Link>
              . <span className="text-copper">*</span>
            </span>
          </label>

          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-xl border-2 border-moody bg-moody text-egg px-6 py-3 text-[1rem] font-semibold tracking-wide transition hover:bg-transparent hover:text-moody cursor-pointer"
            >
              {status === "loading" ? "Sending…" : "Send application"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-500 mt-2">
                Something went wrong. Please try again, or send your application to
                economy@norstec.no.
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
