# Project Prompt: Daily Bengali Hadith Web App

## Project Overview
Build a full-stack web application called **"আজকের হাদিস" (Today's Hadith)** that displays one authentic (Sahih) hadith per day in Bengali, sourced from Sahih Bukhari and Sahih Muslim. The app should be deployable to **Vercel** or **Railway**.

## Tech Stack
- **Frontend + Backend**: Next.js 14+ (App Router), TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma or better-sqlite3) for local/Railway deployment, or Vercel Postgres if deploying to Vercel — pick whichever fits the target platform; keep the data layer abstracted so it's easy to swap
- **Font**: Use a proper Bengali web font (e.g., "Noto Sans Bengali" or "Hind Siliguri") via Google Fonts — Bengali script must render correctly, not tofu boxes

## Data Source
Use the free, no-API-key-required **fawazahmed0/hadith-api** (served via jsDelivr CDN):
- Bengali Bukhari edition: `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-bukhari.json`
- Bengali Muslim edition: `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-muslim.json`
- Full editions list (for reference): `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json`
- Each hadith entry includes a `grades` field — only entries graded **Sahih** should be included in the final pool. Filter out anything graded Da'if/weak or without a clear Sahih grading.

## Data Ingestion Strategy (important — do this at build time, not per-request)
1. Write a one-time ingestion script (`scripts/ingest-hadiths.ts`) that:
   - Fetches both `ben-bukhari.json` and `ben-muslim.json` from the CDN
   - Filters only Sahih-graded hadiths
   - Normalizes each into a common shape: `{ id, source: "bukhari" | "muslim", bookNumber, hadithNumber, textBn, grade }`
   - Saves the cleaned dataset into the local database (or a static JSON file committed to the repo if the dataset is small enough — check total size first)
2. The running app should **never call the external CDN at request time**. All hadiths must be pre-fetched and stored locally so the app works even if the external API is down, and so response times stay fast.
3. Include an npm script `npm run ingest` to re-run this fetch/refresh whenever needed (not on every deploy).

## Daily Selection Logic
- Implement a deterministic function that maps a calendar date to a hadith index, so:
  - The same hadith shows for everyone on the same day
  - It cycles through the entire pool without repeating until the full list is exhausted, then reshuffles/restarts
  - Suggested approach: seed a shuffle of all hadith IDs once (store the shuffled order + a start date in the DB), then `index = daysSinceStartDate % totalHadithCount`
- Expose this as a server-side function `getHadithForDate(date: Date)`

## API Routes (Next.js Route Handlers)
- `GET /api/hadith/today` — returns today's hadith (Bengali text, source book, hadith number, grade)
- `GET /api/hadith/date/:date` — returns the hadith for a specific past date (for browsing history)
- `GET /api/hadith/random` — returns a random Sahih hadith
- All responses in JSON, e.g.:
```json
{
  "date": "2026-07-22",
  "source": "bukhari",
  "hadithNumber": 123,
  "grade": "Sahih",
  "textBn": "..."
}
```

## Frontend Pages
1. **Home page (`/`)**: Large, clean card showing today's hadith in Bengali, the source book + hadith number, and the date. Include a "শেয়ার করুন" (Share) button using the Web Share API, and a "কপি করুন" (Copy) button.
2. **Archive page (`/archive`)**: List/calendar view to browse previous days' hadiths.
3. Simple, elegant, mobile-first design — this will likely be viewed on phones. Use soft, respectful color tones (avoid loud/garish colors), generous line-height for Bengali script readability.

## Scheduling / Automation
- If deploying to **Vercel**: use a Vercel Cron Job (`vercel.json` with a `crons` entry) to hit an internal endpoint once a day at midnight (Asia/Dhaka timezone) — mainly useful if you later add features like sending notifications; the date-based deterministic logic above doesn't strictly need a cron to "generate" the hadith, but set one up for any daily housekeeping tasks.
- If deploying to **Railway**: same idea, using Railway's cron/scheduled service, or a simple `node-cron` running inside the app if it stays always-on.

## Non-functional requirements
- No API key/secrets needed for the hadith data itself, so no sensitive env vars for that part
- Add a `README.md` explaining: how to run `npm run ingest`, how to run the dev server, and how to deploy to both Vercel and Railway
- Add basic error handling: if a date has no hadith (out of range), fall back gracefully
- Write clean, typed, commented code — this is a portfolio/personal project, so code clarity matters as much as functionality

## Deliverables
1. Working Next.js project with the structure above
2. Ingestion script and local cached dataset
3. Working `/`, `/archive`, and API routes
4. `vercel.json` (if targeting Vercel) or Railway config as appropriate
5. README with setup + deployment instructions
