"use client";

import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Script from "next/script";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import { SectionEsaFundingForm as SectionEsaFundingFormType } from "@/types/sections/sectionEsaFundingForm";

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

const DEFAULT_MAX_AMOUNT = 5000;
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

type SectionEsaFundingFormProps = {
  section: SectionEsaFundingFormType;
  className?: string;
};

type Attachment = {
  name: string;
  mimeType: string;
  size: number;
  data: string;
};

const inputClass =
  "w-full rounded-xl border-2 border-moody/20 bg-egg text-moody px-4 py-3 focus:outline-none focus:border-moody transition-colors";

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
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold uppercase tracking-wide text-moody">
        {label}{" "}
        {required && (
          <span aria-hidden className="text-copper">
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

export default function SectionEsaFundingForm({
  section,
  className = "",
}: SectionEsaFundingFormProps) {
  const { title, body, isOpen = true, closedMessage } = section;
  const maxAmount = section.maxAmount ?? DEFAULT_MAX_AMOUNT;

  const [applicantType, setApplicantType] = useState<"student" | "association">("student");
  const [applicantName, setApplicantName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityDates, setActivityDates] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [expectedStudents, setExpectedStudents] = useState("1");
  const [esaCovers, setEsaCovers] = useState("");
  const [esaNotCovers, setEsaNotCovers] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetTotal, setBudgetTotal] = useState("");
  const [otherSupport, setOtherSupport] = useState("");
  const [otherSupportAmount, setOtherSupportAmount] = useState("");
  const [amountRequested, setAmountRequested] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isAssociation = applicantType === "association";
  const remainingNeed = Math.max(0, toNumber(budgetTotal) - toNumber(otherSupportAmount));
  const requested = toNumber(amountRequested);

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

    const totalBytes = [...attachments, ...files].reduce((sum, file) => sum + file.size, 0);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          activityDates,
          activityDescription,
          expectedStudents: toNumber(expectedStudents),
          esaCovers,
          esaNotCovers,
          budget,
          budgetTotal: toNumber(budgetTotal),
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

  return (
    <section className={`section relative mobile-container ${className}`}>
      <StripesVertical side="right" />

      <div className="flex flex-col gap-6 stripes-right py-0! ">
        {title && (
          <h2 className="text-h2 uppercase flex items-center gap-3">
            {title}
            <span aria-hidden className="star-inline" />
          </h2>
        )}

        {body?.length ? (
          <div className="max-w-[80rem] text-moody">
            <PortableText
              value={body}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-[1rem] last:mb-0">{children}</p>,
                },
              }}
            />
          </div>
        ) : null}

        {!isOpen ? (
          <div className="rounded-2xl border p-6 space-y-2 max-w-[80rem]">
            <p className="font-semibold uppercase tracking-wide">Applications are closed</p>
            {closedMessage && <p className="text-sm text-moody/70">{closedMessage}</p>}
          </div>
        ) : status === "success" ? (
          <div className="rounded-2xl border p-6 space-y-2 max-w-[80rem]">
            <p className="font-semibold uppercase tracking-wide">Application sent!</p>
            <p className="text-sm text-moody/70">
              Thank you for your application. You will hear from economy@norstec.no at {email}.
            </p>
          </div>
        ) : (
          <>
            <Script
              src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_KEY}`}
              strategy="afterInteractive"
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[80rem]">
              <Field label="Applying as" required>
                <select
                  value={applicantType}
                  onChange={(e) => setApplicantType(e.target.value as "student" | "association")}
                  className={`${inputClass} pr-10`}
                >
                  <option value="student">Student</option>
                  <option value="association">Student association</option>
                </select>
              </Field>

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

              <Field label="University, college or place of study" required>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Name of course or conference" required>
                <input
                  type="text"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Dates and location" required>
                <input
                  type="text"
                  value={activityDates}
                  onChange={(e) => setActivityDates(e.target.value)}
                  className={inputClass}
                  placeholder="E.g. 12–16 October 2026, ESEC Redu, Belgium"
                  required
                />
              </Field>

              <Field label="Description of the activity" required>
                <textarea
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  className={`${inputClass} min-h-[160px] resize-y`}
                  placeholder="What is the course or conference, and what will you do there? Add a link if you have one."
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

              <Field label="What does ESA cover?" required>
                <textarea
                  value={esaCovers}
                  onChange={(e) => setEsaCovers(e.target.value)}
                  className={`${inputClass} min-h-[120px] resize-y`}
                  placeholder="E.g. course fee, accommodation and meals."
                  required
                />
              </Field>

              <Field label="What does ESA not cover?" required>
                <textarea
                  value={esaNotCovers}
                  onChange={(e) => setEsaNotCovers(e.target.value)}
                  className={`${inputClass} min-h-[120px] resize-y`}
                  placeholder="E.g. travel to and from the course."
                  required
                />
              </Field>

              <Field label="Budget and how the amount is calculated" required>
                <textarea
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={`${inputClass} min-h-[160px] resize-y`}
                  placeholder={
                    "List the costs not covered by ESA, e.g.\nFlight Oslo–Brussels: 2 500 NOK\nTrain to Redu: 600 NOK"
                  }
                  required
                />
              </Field>

              <Field label="Total costs not covered by ESA (NOK)" required>
                <input
                  type="number"
                  min={0}
                  value={budgetTotal}
                  onChange={(e) => setBudgetTotal(e.target.value)}
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Support received or applied for from others">
                <textarea
                  value={otherSupport}
                  onChange={(e) => setOtherSupport(e.target.value)}
                  className={`${inputClass} min-h-[120px] resize-y`}
                  placeholder="E.g. your university or student association. Leave empty if none."
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

              <Field label="Amount applied for (NOK)" required>
                <input
                  type="number"
                  min={1}
                  value={amountRequested}
                  onChange={(e) => setAmountRequested(e.target.value)}
                  className={inputClass}
                  required
                />
              </Field>

              <div className="text-sm text-moody/70 space-y-1">
                <p>
                  Remaining funding need: {formatNok(remainingNeed)}. We can normally grant up to{" "}
                  {formatNok(maxAmount)} per applicant.
                </p>
                {requested > maxAmount && (
                  <p className="text-copper">
                    You are applying for more than {formatNok(maxAmount)}. Explain why in the
                    budget.
                  </p>
                )}
                {requested > remainingNeed && toNumber(budgetTotal) > 0 && (
                  <p className="text-copper">
                    You are applying for more than your remaining funding need.
                  </p>
                )}
              </div>

              <Field label="Attachments">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={handleFiles}
                  className={`${inputClass} text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-moody file:text-egg file:px-4 file:py-2 file:font-semibold file:cursor-pointer`}
                />
              </Field>

              <p className="text-sm text-moody/70">
                Optional: confirmation from ESA or receipts you already have (PDF, JPG or PNG, up to{" "}
                {MAX_FILES} files and 10 MB). Receipts are required before payment and can also be
                sent to economy@norstec.no later.
              </p>

              {fileError && <p className="text-sm text-red-500">{fileError}</p>}

              {attachments.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {attachments.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-3 text-sm text-moody"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                        className="underline text-moody/70 hover:text-moody cursor-pointer"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <label className="flex items-start gap-3 text-sm text-moody">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" required />
                <span>
                  I confirm that the information is correct, and that NORSTEC may process it as
                  described in the{" "}
                  <Link href="/privacy" className="underline">
                    privacy policy
                  </Link>
                  .{" "}
                  <span aria-hidden className="text-copper">
                    *
                  </span>
                </span>
              </label>

              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-moody bg-moody text-egg px-6 py-3 text-[1rem] font-semibold tracking-wide transition hover:bg-transparent hover:text-moody"
                >
                  {status === "loading" ? "Sending…" : "Send application"}
                </button>
                {status === "error" ? (
                  <p className="text-sm text-red-500 mt-2">
                    Something went wrong. Please try again, or send your application to
                    economy@norstec.no.
                  </p>
                ) : (
                  <p className="text-sm text-moody/70 mt-2">
                    Your application is sent to economy@norstec.no, who will reply by email.
                  </p>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
