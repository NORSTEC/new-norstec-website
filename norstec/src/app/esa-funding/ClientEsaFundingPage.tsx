"use client";

import { PortableText, type PortableTextComponents } from "next-sanity";
import EsaFundingForm from "@/components/items/esaFunding/EsaFundingForm";
import type { EsaFundingPage } from "@/types/pages/esaFundingPage";

type Props = {
  data: EsaFundingPage | null;
};

const DEFAULT_MAX_AMOUNT = 5000;

const guidelineComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
    h1: ({ children }) => <h2 className="text-h2 mt-10 mb-4 first:mt-0">{children}</h2>,
    h2: ({ children }) => <h2 className="text-h2 mt-10 mb-4 first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="text-h3 mt-8 mb-3 first:mt-0">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-copper pl-4 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 space-y-2 list-disc pl-5">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 space-y-2 list-decimal pl-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          className="underline"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default function ClientEsaFundingPage({ data }: Props) {
  const title = data?.title || "ESA Funding";
  const isOpen = data?.isOpen !== false;
  const maxAmount = data?.maxAmount ?? DEFAULT_MAX_AMOUNT;

  return (
    <main className="w-full">
      <div className="mobile-container max-w-4xl mx-auto space-y-16">
        <h1 className="text-h1">{title}</h1>

        {data?.guidelines?.length ? (
          <section className="space-y-4">
            <h2 className="text-h2">
              Guidelines
              <span aria-hidden className="star-inline" />
            </h2>
            <PortableText value={data.guidelines} components={guidelineComponents} />
          </section>
        ) : null}

        {isOpen ? (
          <EsaFundingForm maxAmount={maxAmount} />
        ) : (
          <div className="rounded-2xl border p-6 space-y-2">
            <p className="font-semibold uppercase tracking-wide">Applications are closed</p>
            {data?.closedMessage && <p className="text-sm text-moody/70">{data.closedMessage}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
