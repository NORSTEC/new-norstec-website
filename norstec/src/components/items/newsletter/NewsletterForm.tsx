"use client";

import BrevoScripts from "@/components/items/newsletter/BrevoScripts";
import Link from "next/link";

type NewsletterFormProps = {
  tone?: "light" | "dark";
  onNavigate?: () => void;
};

export default function NewsletterForm({ tone = "light", onNavigate }: NewsletterFormProps) {
  const toneTextClass = tone === "dark" ? "text-egg-static" : "text-moody-static";

  return (
    <>
      <BrevoScripts />

      <div
        className={[
          "sib-form flex p-0!  font-barlow!",
          tone === "dark" ? "sib-dark" : "sib-light",
          "newsletter-tone",
          `newsletter-tone-${tone}`,
        ].join(" ")}
      >
        <div id="sib-form-container" className="sib-form-container max-w-xl w-full bg-transparent">
          <div id="error-message" className="sib-form-message-panel m-0!">
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <span className="sib-form-message-panel__inner-text text-md!">
                Your subscription could not be saved. Please check your details and try again.
              </span>
            </div>
          </div>

          <div id="success-message" className="sib-form-message-panel">
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <span className="sib-form-message-panel__inner-text">
                Your subscription has been successful.
              </span>
            </div>
          </div>

          <div
            id="sib-container"
            className="sib-container--large sib-container--vertical bg-transparent! p-0!"
          >
            <form
              id="sib-form"
              method="POST"
              action="https://73a18bf4.sibforms.com/serve/MUIFAHdBEjMl_fVbO0NPv2j162_TBVm2yYw0nvabqJJM0fu1w6olu81X6r2_BDak2nin3jfYIIu4jX-DptW89HZE7-H_JPOW3TT0NB6Gh5PRo6jk-dV4VJUs6SN7xXx2QyYyDwoWilk_0uFP33XsdpLvktzzZRe7zXjjjAtIv7dYR4XVC6CdoUlIZ7nNc-akzwMTzd0zoX8JsSiqaw=="
              data-type="subscription"
              noValidate
            >
              <div className="pb-2">
                <div className="sib-form-block p-0!">
                  <p className={`text-h2 font-normal hidden lg:block ${toneTextClass}`}>Newsletter</p>
                </div>
              </div>

              <div className="py-2">
                <div className="sib-form-block p-0!">
                  <div className="sib-text-form-block">
                    <p className={`font-normal text-text-[1rem]! 2xl:text-[1.25rem]! ${toneTextClass}`}>
                      Subscribe to our newsletter and stay updated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <div className="sib-input sib-form-block p-0!">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <div className="entry__field border-0! rounded-md! ">
                        <input
                          className="input focus:outline-2! w-full rounded-md px-4 py-2 text-moody!"
                          type="text"
                          id="EMAIL"
                          name="EMAIL"
                          autoComplete="email"
                          placeholder="EMAIL"
                          data-required="true"
                          required
                        />
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" />
                  </div>
                </div>
              </div>

              <div>
                <div className="sib-optin sib-form-block p-0!" data-required="true">
                  <div className="form__entry entry_mcq">
                    <div className="form__label-row ">
                      <div className="entry__choice">
                        <label>
                          <input
                            type="checkbox"
                            className="input_replaced"
                            value="1"
                            id="OPT_IN"
                            name="OPT_IN"
                            required
                          />
                          <span className="checkbox checkbox_tick_positive"></span>
                          <span className={`text-[clamp(0.85rem,0.7rem+0.4vw,1.1rem)] font-barlow! ${toneTextClass}`}>
                            {" "}
                            I agree to receive newsletters from NORSTEC.
                          </span>
                        </label>
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" />
                  </div>
                </div>
              </div>

              <div className="pt-2 px-0!">
                <div
                  className="g-recaptcha-v3"
                  data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ></div>

                <p
                  className={[
                    "text-[clamp(0.75rem,0.7rem+0.3vw,1rem)]  leading-snug font-normal",
                    tone === "dark" ? "text-egg!" : "text-moody!",
                  ].join(" ")}
                >
                  By subscribing, you agree to our{" "}
                  <Link
                    href="/privacy"
                    onClick={onNavigate}
                    className={["underline", tone === "dark" ? "text-egg!" : "text-moody!"].join(
                      " "
                    )}
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <div className="py-6">
                <div className="sib-form-block text-left p-0!">
                  <button
                    className="sib-form-block__button sib-form-block__button-with-loader cursor-pointer inline-flex items-center justify-center border-2! rounded-xl transition bg-egg! text-moody! lg:bg-transparent! lg:hover:bg-moody! lg:hover:text-egg! lg:hover:border-moody! text-[clamp(1rem,1rem+0.3vw,1.2rem)] "
                    form="sib-form"
                    type="submit"
                  >
                    <svg
                      className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                      viewBox="0 0 512 512"
                    >
                      <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                    </svg>
                    SUBSCRIBE
                  </button>
                </div>
              </div>

              <input
                type="text"
                name="email_address_check"
                defaultValue=""
                className="input--hidden hidden"
              />
              <input type="hidden" name="locale" value="en" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
