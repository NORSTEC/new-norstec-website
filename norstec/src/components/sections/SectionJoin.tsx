"use client";

import { FormEvent, useMemo, useState } from "react";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import { SectionJoin as SectionJoinType } from "@/types/sections/sectionJoin";

type SectionJoinProps = {
  section: SectionJoinType;
  className?: string;
};

export default function SectionJoin({ section, className = "" }: SectionJoinProps) {
  const { title, organizations = [] } = section;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const organizationName = useMemo(
    () => organizations.find((org) => org._id === organizationId)?.name ?? "Not specified",
    [organizationId, organizations]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = "Join NORSTEC";
    const bodyContent = [
      `Name: ${name || "Not provided"}`,
      `Organization: ${organizationName}`,
      "",
      "Message:",
      message || "(No message provided)",
    ].join("\n");

    const mailto = `mailto:contact@norstec.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

    window.location.href = mailto;
  };

  const inputClass =
    "w-full rounded-xl border-2 border-moody/20 bg-egg text-moody px-4 py-3 focus:outline-none focus:border-moody transition-colors";

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[80rem]">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-moody">Full name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-moody">
              Organization
            </span>
            <select
              name="organization"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className={`${inputClass} pr-10`}
            >
              <option value="">Select organization</option>
              {organizations.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-moody">
              Message
            </span>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} min-h-[160px] resize-y`}
              placeholder="Tell us about your project, background, or what you hope to collaborate on."
              required
            />
          </label>

          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl border-2 border-moody bg-moody text-egg px-6 py-3 text-[1rem] font-semibold tracking-wide transition hover:bg-transparent hover:text-moody"
            >
              Send message
            </button>
            <p className="text-sm text-moody/70 mt-2">
              This will open your email client and prefill an email to contact@norstec.no.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
