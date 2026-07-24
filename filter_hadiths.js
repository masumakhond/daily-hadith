const fs = require('fs');

const dataPath = './src/data/hadiths.json';
const backupPath = './src/data/hadiths_original.json';

// Read the full original JSON file
const rawData = fs.readFileSync(backupPath, 'utf8');
const allHadiths = JSON.parse(rawData);

// Read the currently shortlisted JSON file
const currentData = fs.readFileSync(dataPath, 'utf8');
const shortlistedHadiths = JSON.parse(currentData);

// Create a set of existing IDs so we don't add duplicates
const existingIds = new Set(shortlistedHadiths.map(h => h.id));

// Keywords for the Prophet's character (Akhlaqun Nabi)
const nabiKeywords = [
  'উত্তম আদর্শ',
  'উত্তম চরিত্র',
  'রাসূলের চরিত্র',
  'নবীর চরিত্র',
  'মহান চরিত্র',
  'নবীজির আচরণ',
  'রাসূলের আচরণ',
  'নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এর চরিত্র',
  'রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এর চরিত্র'
];

// Alternatively, look for hadiths that contain BOTH 'চরিত্র' (character) and 'রাসূল' (Rasul) or 'নবী' (Nabi)
// This broader search might find more matches
const nabiTerms = ['রাসূল', 'নবী'];
const charTerms = ['চরিত্র', 'আচরণ', 'আদর্শ', 'গুণ'];

const nabiMatches = allHadiths.filter(h => {
  if (!h.textBn) return false;
  if (existingIds.has(h.id)) return false; // Skip if already in the shortlist
  
  // Direct keyword match
  const hasDirectMatch = nabiKeywords.some(keyword => h.textBn.includes(keyword));
  if (hasDirectMatch) return true;
  
  // Or BOTH a Nabi term AND a Character term close to each other, but simple 'includes' is safer for now
  const hasNabi = nabiTerms.some(term => h.textBn.includes(term));
  const hasChar = charTerms.some(term => h.textBn.includes(term));
  
  if (hasNabi && hasChar) {
    // Check if they appear somewhat related (just both in the text is a good start for hadith)
    return true;
  }
  
  return false;
});

console.log(`Found ${nabiMatches.length} NEW hadiths related to the Prophet's character (Akhlaqun Nabi).`);

// Let's add up to 100 of these specifically to keep the list focused
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledNabiMatches = shuffle(nabiMatches);
const nabiShortList = shuffledNabiMatches.slice(0, 100);

console.log(`Adding ${nabiShortList.length} hadiths to the existing ${shortlistedHadiths.length} hadiths.`);

// Combine lists
const combinedList = [...shortlistedHadiths, ...nabiShortList];

// Write the combined list back to hadiths.json
fs.writeFileSync(dataPath, JSON.stringify(combinedList));
console.log(`Successfully wrote ${combinedList.length} hadiths to src/data/hadiths.json`);
