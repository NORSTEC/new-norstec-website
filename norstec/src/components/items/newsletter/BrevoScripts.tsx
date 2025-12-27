"use client";
import { useEffect } from "react";
import Script from "next/script";

const SITEKEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

if (!SITEKEY) {
  throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
}

export default function BrevoScripts() {
  useEffect(() => {
    window.REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
    window.LOCALE = "en";

    const invalid =
      "The information provided is invalid. Please review the field format and try again.";
    window.EMAIL_INVALID_MESSAGE = invalid;
    window.SMS_INVALID_MESSAGE = invalid;
    window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
    window.GENERIC_INVALID_MESSAGE = invalid;

    window.translation = {
      common: {
        selectedList: "{quantity} list selected",
        selectedLists: "{quantity} lists selected",
        selectedOption: "{quantity} selected",
        selectedOptions: "{quantity} selected",
      },
    };

    window.AUTOHIDE = true;
  }, []);

  return (
    <>
      <Script src="https://sibforms.com/forms/end-form/build/main.js" strategy="afterInteractive" />
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITEKEY}&hl=en`}
        strategy="afterInteractive"
      />
    </>
  );
}
