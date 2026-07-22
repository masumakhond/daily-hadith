# আজকের হাদিস (Today's Hadith)

A full-stack Next.js web application that displays one authentic (Sahih) hadith per day in Bengali, sourced from Sahih Bukhari and Sahih Muslim.

## Features
- **Daily Deterministic Selection**: Everyone sees the same hadith globally based on the current date.
- **Archive**: Browse hadiths from previous days.
- **Copy & Share**: Easily copy or share hadiths via the native Web Share API.
- **REST APIs**: Provides endpoints to fetch today's hadith, a random hadith, or a hadith for a specific date.
- **No Database Needed**: Hadiths are pre-fetched and stored locally as a static JSON file for instant loading times and zero database management.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Ingest Hadiths (One-time setup)
To fetch the latest hadith data from the CDN, filter for Sahih entries, and generate the local JSON dataset, run:
```bash
npm run ingest
```
This will create `src/data/hadiths.json`.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This app is built to be easily deployed to **Vercel** or **Railway** without requiring any environment variables or external database connections.

### Deploying to Vercel
1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Deploy! Vercel will automatically detect Next.js.
4. *Optional*: A `vercel.json` is included to trigger a cron job hitting `/api/hadith/today` at midnight (useful if you plan to add push notifications later).

### Deploying to Railway
1. Push your code to GitHub.
2. Create a New Project on Railway from the GitHub repo.
3. Railway will automatically build and deploy the Next.js app.

## API Routes

- `GET /api/hadith/today` : Returns today's hadith.
- `GET /api/hadith/date/YYYY-MM-DD` : Returns the hadith for the specified date.
- `GET /api/hadith/random` : Returns a random hadith.
