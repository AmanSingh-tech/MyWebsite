# aman singh · portfolio

A warm, playful single-page portfolio (inspired by mildsugardesign.jp), built with Next.js 14 + Tailwind.

- **Work** is pulled from GitHub automatically and refreshed once a day (ISR), so new repos and pushes appear with no redeploy.
- **Numbers** are pulled live from LeetCode and Codeforces, on the same daily refresh.
- **Hire me** form emails submissions to your Gmail (sent from your own Gmail account via an App Password). Hit Reply and it goes to the visitor.

## Run locally

```bash
npm install
# create .env.local with GMAIL_APP_PASSWORD=... and GITHUB_TOKEN=...
npm run dev
```

## Deploy (Vercel)

In **Project → Settings → Environment Variables** add:

| Variable | Needed? | What it does |
| --- | --- | --- |
| `GMAIL_APP_PASSWORD` | yes, for the form | 16-letter App Password from Google Account → Security → 2-Step Verification → App passwords. Without it, the form offers a mailto fallback. |
| `GITHUB_TOKEN` | recommended | Classic token with **no scopes**. Avoids GitHub's 60 req/hr anonymous limit on shared build IPs. |
| `GMAIL_USER` / `CONTACT_TO` | optional | Sending account (defaults to the email in `site.ts`) / delivery address (defaults to `GMAIL_USER`). |

## Editing content

Everything personal is in [`app/lib/site.ts`](app/lib/site.ts):

- `site`: name, bio, links, skills
- `cases`: experience cards
- `achievements`: highlights list
- `featuredRepos`: repos pinned to the top of **Work** (the rest sort by latest push)
- `hiddenRepos`: repos never shown

To feature a project well, give the repo a **description**, **topics**, and a **website** URL on GitHub. The cards use all three, and the website shows up as a "Live demo" button.
