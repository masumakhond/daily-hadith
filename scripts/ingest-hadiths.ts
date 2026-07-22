import fs from 'fs';
import path from 'path';

const BUKHARI_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-bukhari.json';
const MUSLIM_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-muslim.json';

const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'hadiths.json');

type RawHadith = {
  hadithnumber: number;
  arabicnumber: number | string;
  text: string;
  grades: { name: string; grade: string }[];
  reference: { book: number; hadith: number };
};

type NormalizedHadith = {
  id: string;
  source: 'bukhari' | 'muslim';
  bookNumber: number;
  hadithNumber: number;
  textBn: string;
  grade: string;
};

async function fetchAndNormalize(url: string, source: 'bukhari' | 'muslim'): Promise<NormalizedHadith[]> {
  console.log(`Fetching ${source} from ${url}...`);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${source}: ${response.statusText}`);
  }

  const data = await response.json();
  const rawHadiths: RawHadith[] = data.hadiths;

  console.log(`Loaded ${rawHadiths.length} raw hadiths from ${source}. Filtering and normalizing...`);

  const normalized: NormalizedHadith[] = [];

  for (const raw of rawHadiths) {
    // Both Bukhari and Muslim are considered entirely Sahih.
    // The dataset might have empty grades array for them.
    // We will include all of them and mark them as Sahih.
    // Also, filter out any hadiths with empty text.
    if (!raw.text || raw.text.trim().length === 0) continue;

    normalized.push({
      id: `${source}-${raw.hadithnumber}`,
      source,
      bookNumber: raw.reference?.book || 0,
      hadithNumber: raw.hadithnumber,
      textBn: raw.text.trim(),
      grade: 'Sahih'
    });
  }

  console.log(`Processed ${normalized.length} valid hadiths from ${source}.`);
  return normalized;
}

async function main() {
  try {
    // Ensure output directory exists
    const dir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const bukhari = await fetchAndNormalize(BUKHARI_URL, 'bukhari');
    const muslim = await fetchAndNormalize(MUSLIM_URL, 'muslim');

    // Combine them
    const combined = [...bukhari, ...muslim];

    // Shuffle the combined array using a simple deterministic seed-like or just random shuffle.
    // Since we need to cycle through them, a one-time shuffle is perfect.
    console.log(`Total hadiths: ${combined.length}. Shuffling...`);
    
    // Fisher-Yates shuffle
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    // Save as minified JSON to save space
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(combined));
    
    console.log(`Successfully saved ${combined.length} hadiths to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Error during ingestion:', error);
    process.exit(1);
  }
}

main();
