"use client";

import { FormEvent, useState } from "react";
import { PortableText } from "next-sanity";
import Script from "next/script";
import type { SectionIncubatorContactForm as SectionIncubatorContactFormType } from "@/types/sections/sectionIncubatorContactForm";
import StripesCornerBottomRight from "@/components/items/stripes/StripesCornerBottomRight";

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_INCUBATOR_APPS_SCRIPT_URL!;
const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_INCUBATOR_KEY!;

type Props = {
  section: SectionIncubatorContactFormType;
  className?: string;
};

function IncubatorContactForm({ positionTitle }: { positionTitle: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const inputClass =
    "w-full rounded-xl border-2 border-moody/20 bg-transparent px-4 py-3 focus:outline-none focus:border-moody transition-colors";

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
              action: "incubator_interest",
            });

            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      });

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          position: positionTitle,
          name,
          email,
          message,
          recaptchaToken,
        }),
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border p-6 space-y-2">
        <p className="font-semibold uppercase tracking-wide">Message sent!</p>
        <p className="text-sm text-moody/70">We'll be in touch at {email}.</p>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_KEY}`}
        strategy="afterInteractive"
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-h2">Apply</h2>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide">
            Full name <span className="text-copper">*</span>
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide">
            Email <span className="text-copper">*</span>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide">
            Message <span className="text-copper">*</span>
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} min-h-[140px] resize-y`}
            required
          />
        </label>

        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-xl border-2 border-moody bg-moody text-egg px-6 py-3 text-[1rem] font-semibold tracking-wide transition hover:bg-transparent hover:text-moody cursor-pointer"
          >
            {status === "loading" ? "Sending…" : "Apply Now"}
          </button>
          {status === "error" && (
            <p className="text-sm text-red-500 mt-2">Something went wrong. Please try again.</p>
          )}
        </div>
      </form>
    </>
  );
}

export default function SectionIncubatorContactForm({ section, className = "" }: Props) {
  const { title, body } = section;

  return (
    <section className={`section desktop-container ${className}`}>
      <StripesCornerBottomRight />
      <div className=" flex w-full max-w-4xl flex-col gap-8">
        <div className="space-y-4">
          <h2 className="text-h2 uppercase">
            {title}
            <span aria-hidden className="star-inline" />
          </h2>
          {body?.length ? (
            <PortableText
              value={body}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                },
              }}
            />
          ) : null}
        </div>

        <IncubatorContactForm positionTitle={title} />
      </div>
    </section>
  );
}
