import Link from "next/link";
import StripesVertical from "@/components/items/stripes/StripesVertical";

export const metadata = {
  title: "Privacy Policy | NORSTEC",
  description: "NORSTEC Privacy Policy",
};

export default function PrivacyPage() {
  const lastUpdated = "18/09/2026";

  return (
    <>
      <main className="w-full stripes-right mobile-container relative">
        <StripesVertical side={"right"} duration={1.5} />
        <header className="mb-10">
          <h1 className="text-h2">
            Privacy Policy
            <span aria-hidden className="star-inline" />
          </h1>
          <p className="text-sm text-moody/70">
            Last updated: <span className="font-medium text-moody">{lastUpdated}</span>
          </p>
        </header>

        {/* Intro */}
        <section className="mb-10">
          <p className="text-base leading-relaxed">
            NORSTEC respects your privacy and is committed to protecting your personal data. This
            Privacy Policy explains how we collect, use, and protect your information when you
            interact with our website.
          </p>
        </section>

        {/* Content */}
        <div className="space-y-10">
          <PolicySection title="1. Who we are">
            <p className="leading-relaxed">
              NORSTEC
              <br />
              Organization number: 933 031 152
            </p>
          </PolicySection>

          <PolicySection title="2. What personal data we collect">
            <ul className="list-disc pl-5 space-y-2 text-moody leading-relaxed">
              <li>Email address (when you subscribe to our newsletter)</li>
              <li>
                Contact details, place of study and information about your activity and budget
                (when you apply for ESA funding)
              </li>
              <li>Technical/security data required for abuse prevention (via reCAPTCHA)</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              We do <span className="font-medium">not</span> sell or share your personal data with
              third parties for their own marketing purposes.
            </p>
          </PolicySection>

          <PolicySection title="3. Newsletter subscriptions">
            <p className="text-moody leading-relaxed">
              When you subscribe to our newsletter, we collect your email address to send you
              updates, news, and marketing communications from NORSTEC.
            </p>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-moody leading-relaxed">
              <li>Subscribing is voluntary</li>
              <li>You must actively consent before subscribing</li>
              <li>You can unsubscribe at any time using the link in our emails</li>
            </ul>

            <div className="mt-6 p-5">
              <p className="text-moody leading-relaxed">
                <span className="font-medium text-moody">Email service provider:</span> We use{" "}
                <span className="font-medium">Brevo</span> as our email marketing platform. By
                subscribing, you acknowledge that your information will be transferred to Brevo for
                processing in accordance with their Privacy Policy.
              </p>
              <p className="mt-3 text-sm">
                <a
                  href="https://www.brevo.com/en/legal/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-moody/70 hover:text-moody"
                >
                  Brevo Privacy Policy
                </a>
              </p>
            </div>
          </PolicySection>

          <PolicySection title="4. ESA funding applications">
            <p className="text-moody leading-relaxed">
              When you apply for funding for an ESA course or conference, the information you
              enter in the form and any attachments are sent by email to NORSTEC&apos;s finance
              team (economy@norstec.no). We use the information to process your application, pay
              out any funding and report to the Norwegian Space Agency.
            </p>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-moody leading-relaxed">
              <li>The information is not stored on the website</li>
              <li>We do not ask for your bank account number in the form</li>
              <li>Only the people handling applications have access to the information</li>
            </ul>
          </PolicySection>

          <PolicySection title="5. Third-party services">
            <h3 className="text-lg font-medium text-moody mt-1">Google reCAPTCHA</h3>
            <p className="mt-2 text-moody leading-relaxed">
              This site is protected by Google reCAPTCHA to prevent spam and abuse. reCAPTCHA may
              collect information about your device and behavior to determine whether you are a
              human user.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-moody/70 hover:text-moody"
              >
                Google Privacy Policy
              </a>
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-moody/70 hover:text-moody"
              >
                Google Terms of Service
              </a>
            </div>
          </PolicySection>

          <PolicySection title="6. Legal basis for processing">
            <p className="text-moody leading-relaxed">We process personal data based on:</p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-moody leading-relaxed">
              <li>
                <span className="font-medium text-moody">Consent</span> (newsletter subscriptions)
              </li>
              <li>
                <span className="font-medium text-moody">Contract and legal obligation</span>{" "}
                (processing ESA funding applications, payment and accounting)
              </li>
              <li>
                <span className="font-medium text-moody">Legitimate interest</span> (site security
                and abuse prevention)
              </li>
            </ul>
            <p className="mt-4 text-moody leading-relaxed">
              You may withdraw your consent at any time.
            </p>
          </PolicySection>

          <PolicySection title="7. How long we store your data">
            <p className="text-moody leading-relaxed">
              We store personal data only for as long as necessary for the purposes described:
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-moody leading-relaxed">
              <li>Newsletter data is stored until you unsubscribe</li>
              <li>
                ESA funding applications and payment documentation are stored for at least five
                years, as required by our funding guidelines
              </li>
              <li>Security-related data is retained according to third-party service policies</li>
            </ul>
          </PolicySection>

          <PolicySection title="8. Your rights">
            <p className="text-moody leading-relaxed">
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-moody leading-relaxed">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
              <li>Object to certain types of processing</li>
            </ul>
            <p className="mt-4 text-moody leading-relaxed">
              To exercise your rights, please contact us using the details below.
            </p>
          </PolicySection>

          <PolicySection title="9. Changes to this policy">
            <p className="text-moody leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be published on
              this page with an updated revision date.
            </p>
          </PolicySection>

          <PolicySection title="10. Contact">
            <p className="text-moody leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your data, please
              contact us:
            </p>

            <div className="mt-4">
              <p className="text-moody/90 leading-relaxed">
                <span className="font-medium text-moody">Email:</span>{" "}
                <span className="text-moody/70">contact@norstec.no</span>
              </p>
              <p className="text-moody/90 leading-relaxed">
                <span className="font-medium text-moody">Phone:</span>{" "}
                <span className="text-moody/70">+47 986 55 256</span>
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 underline text-moody/90 hover:text-moody"
              >
                Back to home
              </Link>
            </div>
          </PolicySection>
        </div>
      </main>
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl lg:text-2xl font-medium text-moody">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
