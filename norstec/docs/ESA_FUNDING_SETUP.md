# ESA funding setup

The `/esa-funding` page lets students apply for NORSTEC funding for ESA courses and conferences.

- **The page** is built from Sanity sections (**ESA funding page**), e.g. a text section with the
  guidelines and the **ESA funding form section**.
- **The form** posts to a Google Apps Script, which verifies reCAPTCHA Enterprise and emails the
  application (with any attachments) to `economy@norstec.no`. Reply-to is the applicant, so the
  finance team answers straight from the inbox.
- **Nothing is stored** on the website, in Sanity, Drive or Sheets. The form does not ask for a bank
  account number; the finance team asks for it (and receipts) in their reply.

## Environment variables

Add locally (`.env.local`) and in Vercel:

```text
NEXT_PUBLIC_ESA_FUNDING_APPS_SCRIPT_URL=https://script.google.com/macros/s/…/exec
NEXT_PUBLIC_RECAPTCHA_ESA_FUNDING_KEY=your-recaptcha-site-key
```

## 1. reCAPTCHA Enterprise key (Google Cloud)

Use the same Google Cloud project as the existing reCAPTCHA keys.

1. Google Cloud Console → **Security → reCAPTCHA** → **Create key**.
2. Display name `norstec-esa-funding`, platform **Website**.
3. Domains: `norstec.no`, `www.norstec.no`, `localhost` (and any Vercel preview domain you test on).
4. Leave **checkbox challenge off** (score-based key).
5. Copy the key ID → `NEXT_PUBLIC_RECAPTCHA_ESA_FUNDING_KEY` and the `RECAPTCHA_SITE_KEY` script
   property below.

You also need an **API key** so the script can create assessments. Reuse the one the existing Apps
Scripts use, or: **APIs & Services → Credentials → Create credentials → API key**, then restrict it
to **reCAPTCHA Enterprise API**.

## 2. Apps Script

1. Log in to Google with a NORSTEC account (the email is sent from this account — not
   `economy@`, which is a group).
2. Go to https://script.google.com → **New project**, name it `NORSTEC ESA funding`.
3. Paste the contents of [`esa-funding-apps-script.gs`](./esa-funding-apps-script.gs).
4. **Project Settings → Script properties**, add:

   | Property               | Value                     |
   | ---------------------- | ------------------------- |
   | `RECAPTCHA_PROJECT_ID` | Google Cloud project ID   |
   | `RECAPTCHA_API_KEY`    | API key from step 1       |
   | `RECAPTCHA_SITE_KEY`   | reCAPTCHA key from step 1 |
   | `TO_EMAIL`             | `economy@norstec.no`      |

5. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Authorize the permissions (send email, connect to external service).
7. Copy the `/exec` URL → `NEXT_PUBLIC_ESA_FUNDING_APPS_SCRIPT_URL`.

When you change the script later: **Deploy → Manage deployments → Edit → Version: New version**.
That keeps the same URL.

## 3. Google Group

`economy@norstec.no` must accept email from the account running the script. In Google Groups →
**economy** → **Group settings → Who can post**, make sure that account (or everyone in the
organization) can post.

## 4. Sanity

The page is built from sections, like the join page.

1. Deploy the studio (`npm run deploy` in `studio/`) so **ESA funding page** shows up.
2. Create the sections and add them to **ESA funding page**, for example:
   - **Text + Image Section** with the guidelines (no images, turn on **Mirror layout** for stripes
     on the right)
   - **ESA funding form section** with a title and a short intro
3. Publish.
4. When the funding pot is used up, open the **ESA funding form section** and turn off **Accepting
   applications**. The form is hidden and the closed message is shown instead.

## 5. Test

Submit a test application from `localhost` with one attachment and check that it arrives at
`economy@norstec.no` with the right reply-to.
