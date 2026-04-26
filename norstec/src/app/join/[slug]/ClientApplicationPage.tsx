"use client";
import { FormEvent, useState } from "react";
import { PortableText } from "next-sanity";
import NextImage from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import { ApplicationPage } from "@/types/pages/applicationPage";
import TeamCarousel from "@/components/items/team/TeamCarousel";
import type { SectionTeamMember } from "@/types/sections/sectionTeam";
import Script from "next/script";

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

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!;
type Props = {
    data: ApplicationPage;
};

type ListBoxItem = {
    title: string;
    items: string[];
};

function ListBox({ title, items }: ListBoxItem) {
    return (
        <div className="rounded-2xl border p-6 space-y-3">
            <h2 className="text-h2">{title}</h2>
            <ul className="space-y-2 list-disc pl-5">
                {items.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ApplyForm({ positionTitle }: { positionTitle: string }) {
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
            const token = await grecaptcha.enterprise!.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_APPLICATIONS_KEY!,
              { action: "application_submit" }
            );

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
                <p className="font-semibold uppercase tracking-wide">Application sent!</p>
                <p className="text-sm text-moody/70">We'll be in touch at {email}.</p>
            </div>
        );
    }

    return (
      <>
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_APPLICATIONS_KEY}`}
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
                    placeholder="Tell us about yourself and why you're a great fit."
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

export default function ClientApplicationPage({ data }: Props) {
    const imageSrc = data.landingImage
        ? imageBuilder(data.landingImage, {
            width: 1600,
            height: 900,
            quality: 90,
            fit: "crop",
        })
        : null;

    const contactMembers: SectionTeamMember[] = (data.contactPersons ?? []).map((person) => ({
        _key: person._id,
        member: { ...person },
    }));

    const listSections: ListBoxItem[] = [
        data.responsibilities?.length
            ? { title: "What You Will Do", items: data.responsibilities }
            : null,
        data.requiredQualifications?.length
            ? { title: "What We Are Looking For", items: data.requiredQualifications }
            : null,
        data.niceToHave?.items?.length
            ? { title: data.niceToHave.title, items: data.niceToHave.items }
            : null,
        data.expectations?.items?.length
            ? { title: data.expectations.title, items: data.expectations.items }
            : null,
        data.benefits?.length
            ? { title: "What You Can Expect From Us", items: data.benefits }
            : null,
    ].filter(Boolean) as ListBoxItem[];

    const hasDescriptions =
        data.aboutRole ||
        data.howWeWork?.content ||
        data.position;

    return (
        <main className="w-full">
            {imageSrc && (
                <div
                    className="relative w-screen h-screen overflow-hidden"
                    data-section-hero
                >
                    <NextImage
                        src={imageSrc}
                        alt={data.landingImage?.alt || data.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 z-5 bg-linear-to-b from-black/90 via-black/70 to-black/20" />
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-egg-static drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)]">
                        <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] xl:text-[7rem] 2xl:text-[9rem] font-light font-barlow uppercase">
                            {data.title}
                        </h1>
                    </div>
                </div>
            )}

            <div className="mobile-container max-w-7xl mx-auto py-12 space-y-12">

                {!imageSrc && <h1 className="text-h1">{data.title}</h1>}

                {(hasDescriptions || listSections.length > 0) && (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

                        <div className="space-y-10">
                            {data.aboutRole && (
                                <div className="space-y-4">
                                    <h2 className="text-h2">About the Role</h2>
                                    <PortableText
                                        value={data.aboutRole}
                                        components={{
                                            block: {
                                                normal: ({ children }) => (
                                                    <p className="mb-4 last:mb-0">{children}</p>
                                                ),
                                            },
                                        }}
                                    />
                                </div>
                            )}

                            {data.howWeWork?.content && (
                                <div className="space-y-4">
                                    <h2 className="text-h2">{data.howWeWork.title}</h2>
                                    <PortableText
                                        value={data.howWeWork.content}
                                        components={{
                                            block: {
                                                normal: ({ children }) => (
                                                    <p className="mb-4 last:mb-0">{children}</p>
                                                ),
                                            },
                                        }}
                                    />
                                </div>
                            )}

                            {data.position && (
                                <div className="space-y-4">
                                    <h2 className="text-h2">{data.position.name}</h2>
                                    {data.position.description && (
                                        <PortableText
                                            value={data.position.description}
                                            components={{
                                                block: {
                                                    normal: ({ children }) => (
                                                        <p className="mb-4 last:mb-0">{children}</p>
                                                    ),
                                                },
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            {contactMembers.length > 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-h2">Contact</h2>
                                    <TeamCarousel members={contactMembers} />
                                </div>
                            )}

                            <ApplyForm positionTitle={data.title} />
                        </div>

                        {listSections.length > 0 && (
                            <div className="space-y-6 lg:sticky lg:top-12">
                                {listSections.map((section) => (
                                    <ListBox
                                        key={section.title}
                                        title={section.title}
                                        items={section.items}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </main>

    );
}
