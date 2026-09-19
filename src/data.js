// Mock data for perfumes, including dupes, skin types, and gender
export const initialPerfumes = [
  {
    id: 1, name: 'Bleu de Chanel', brand: 'Chanel', family: 'Woody Aromatic',
    price: 130, longevity: 8, quality: 9, popularity: 95,
    notes: ['Citrus', 'Woody', 'Amber'],
    dupe: 'Armaf Club de Nuit Blue Iconic', skinTypes: ['Oily', 'Normal'], gender: 'Male'
  },
  {
    id: 2, name: 'Aventus', brand: 'Creed', family: 'Fruity Chypre',
    price: 350, longevity: 9, quality: 10, popularity: 98,
    notes: ['Fruity', 'Musky', 'Woody'],
    dupe: 'Montblanc Explorer', skinTypes: ['All Types'], gender: 'Male'
  },
  {
    id: 3, name: 'Sauvage', brand: 'Dior', family: 'Aromatic Fougere',
    price: 110, longevity: 10, quality: 8, popularity: 99,
    notes: ['Fresh', 'Spicy', 'Woody'],
    dupe: 'Prada Luna Rossa Carbon', skinTypes: ['Oily', 'Combination'], gender: 'Male'
  },
  {
    id: 4, name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', family: 'Floral Woody',
    price: 325, longevity: 10, quality: 10, popularity: 92,
    notes: ['Floral', 'Woody', 'Amber'],
    dupe: 'Ariana Grande Cloud', skinTypes: ['Dry', 'Normal'], gender: 'Unisex'
  },
  {
    id: 5, name: 'Santal 33', brand: 'Le Labo', family: 'Woody Aromatic',
    price: 215, longevity: 8, quality: 9, popularity: 88,
    notes: ['Woody', 'Musky', 'Floral'],
    dupe: 'Maison Louis Marie No.04', skinTypes: ['Dry', 'Sensitive'], gender: 'Unisex'
  },
  {
    id: 6, name: 'Tuscan Leather', brand: 'Tom Ford', family: 'Leather',
    price: 285, longevity: 9, quality: 9, popularity: 85,
    notes: ['Leather', 'Fruity', 'Spicy'],
    dupe: 'Rasasi La Yuqawam', skinTypes: ['Normal', 'Oily'], gender: 'Male'
  },
  {
    id: 7, name: 'Oud Wood', brand: 'Tom Ford', family: 'Woody',
    price: 285, longevity: 7, quality: 9, popularity: 89,
    notes: ['Woody', 'Spicy', 'Amber'],
    dupe: 'Versace Oud Noir', skinTypes: ['Dry', 'Normal'], gender: 'Unisex'
  },
  {
    id: 8, name: 'Flowerbomb', brand: 'Viktor&Rolf', family: 'Amber Floral',
    price: 120, longevity: 8, quality: 8, popularity: 90,
    notes: ['Floral', 'Sweet', 'Amber'],
    dupe: 'Zara Oriental', skinTypes: ['All Types'], gender: 'Female'
  },
  {
    id: 9, name: 'Light Blue', brand: 'Dolce & Gabbana', family: 'Floral Fruity',
    price: 90, longevity: 6, quality: 7, popularity: 93,
    notes: ['Citrus', 'Fruity', 'Floral'],
    dupe: 'Moschino Cheap & Chic I Love Love', skinTypes: ['Oily', 'Combination'], gender: 'Female'
  },
  {
    id: 10, name: 'Black Orchid', brand: 'Tom Ford', family: 'Amber Floral',
    price: 150, longevity: 9, quality: 9, popularity: 87,
    notes: ['Floral', 'Spicy', 'Woody'],
    dupe: 'Tiziana Terenzi Maremma', skinTypes: ['Dry', 'Normal'], gender: 'Female'
  },
  {
    id: 11, name: 'Tobacco Vanille', brand: 'Tom Ford', family: 'Amber Spicy',
    price: 295, longevity: 10, quality: 10, popularity: 91,
    notes: ['Tobacco', 'Vanilla', 'Spicy'],
    dupe: 'Maison Alhambra Tobacco Touch', skinTypes: ['Dry', 'Normal'], gender: 'Unisex'
  },
  {
    id: 12, name: 'Coco Mademoiselle', brand: 'Chanel', family: 'Amber Floral',
    price: 145, longevity: 8, quality: 9, popularity: 96,
    notes: ['Citrus', 'Rose', 'Patchouli'],
    dupe: 'Armaf Club De Nuit Woman', skinTypes: ['All Types'], gender: 'Female'
  },
  {
    id: 13, name: 'Silver Mountain Water', brand: 'Creed', family: 'Aromatic',
    price: 350, longevity: 7, quality: 9, popularity: 82,
    notes: ['Citrus', 'Green Tea', 'Musky'],
    dupe: 'Armaf Club de Nuit Sillage', skinTypes: ['Oily', 'Combination'], gender: 'Unisex'
  },
];

export const dupeDatabase = {
  'Armaf Club de Nuit Blue Iconic': { brand: 'Armaf', price: 40, longevity: 8, quality: 7, popularity: 80, notes: ['Citrus', 'Woody', 'Mint'], skinTypes: ['Oily', 'Normal'], gender: 'Male', family: 'Woody Aromatic' },
  'Montblanc Explorer': { brand: 'Montblanc', price: 60, longevity: 7, quality: 8, popularity: 85, notes: ['Bergamot', 'Vetiver', 'Patchouli'], skinTypes: ['All Types'], gender: 'Male', family: 'Woody Aromatic' },
  'Prada Luna Rossa Carbon': { brand: 'Prada', price: 80, longevity: 8, quality: 9, popularity: 82, notes: ['Lavender', 'Metallic', 'Coal'], skinTypes: ['Oily', 'Combination'], gender: 'Male', family: 'Aromatic Fougere' },
  'Ariana Grande Cloud': { brand: 'Ariana Grande', price: 45, longevity: 7, quality: 7, popularity: 95, notes: ['Lavender', 'Pear', 'Praline'], skinTypes: ['Dry', 'Normal'], gender: 'Female', family: 'Floral Fruity Gourmand' },
  'Maison Louis Marie No.04': { brand: 'Maison Louis Marie', price: 90, longevity: 7, quality: 8, popularity: 75, notes: ['Sandalwood', 'Cedarwood', 'Vetiver'], skinTypes: ['Dry', 'Sensitive'], gender: 'Unisex', family: 'Woody' },
  'Rasasi La Yuqawam': { brand: 'Rasasi', price: 75, longevity: 10, quality: 8, popularity: 78, notes: ['Raspberry', 'Saffron', 'Leather'], skinTypes: ['Normal', 'Oily'], gender: 'Male', family: 'Leather' },
  'Versace Oud Noir': { brand: 'Versace', price: 85, longevity: 7, quality: 8, popularity: 81, notes: ['Oud', 'Spices', 'Leather'], skinTypes: ['Dry', 'Normal'], gender: 'Male', family: 'Woody Spicy' },
  'Zara Oriental': { brand: 'Zara', price: 20, longevity: 5, quality: 6, popularity: 88, notes: ['Caramel', 'Vanilla', 'Freesia'], skinTypes: ['All Types'], gender: 'Female', family: 'Amber Floral' },
  'Moschino Cheap & Chic I Love Love': { brand: 'Moschino', price: 40, longevity: 6, quality: 7, popularity: 79, notes: ['Grapefruit', 'Orange', 'Lemon'], skinTypes: ['Oily', 'Combination'], gender: 'Female', family: 'Floral Fruity' },
  'Tiziana Terenzi Maremma': { brand: 'Tiziana Terenzi', price: 140, longevity: 9, quality: 9, popularity: 72, notes: ['Oak', 'Oud', 'Chocolate'], skinTypes: ['Dry', 'Normal'], gender: 'Unisex', family: 'Amber Floral' },
  'Maison Alhambra Tobacco Touch': { brand: 'Maison Alhambra', price: 35, longevity: 8, quality: 7, popularity: 84, notes: ['Tobacco', 'Vanilla', 'Cinnamon'], skinTypes: ['Dry', 'Normal'], gender: 'Unisex', family: 'Amber Spicy' },
  'Armaf Club De Nuit Woman': { brand: 'Armaf', price: 30, longevity: 7, quality: 7, popularity: 86, notes: ['Orange', 'Rose', 'Patchouli'], skinTypes: ['All Types'], gender: 'Female', family: 'Amber Floral' },
  'Armaf Club de Nuit Sillage': { brand: 'Armaf', price: 40, longevity: 8, quality: 8, popularity: 83, notes: ['Bergamot', 'Blackcurrant', 'Musk'], skinTypes: ['Oily', 'Combination'], gender: 'Unisex', family: 'Floral Woody Musk' }
};

export const fragranceFamilies = [
  { name: 'CITRUS', color: '#facc15', id: 'citrus' },
  { name: 'FRESH', color: '#34d399', id: 'fresh' },
  { name: 'HERBAL', color: '#4ade80', id: 'herbal' },
  { name: 'FLORAL', color: '#f472b6', id: 'floral' },
  { name: 'FRUITY', color: '#f87171', id: 'fruity' },
  { name: 'SWEET', color: '#c084fc', id: 'sweet' },
  { name: 'SPICY', color: '#fb923c', id: 'spicy' },
  { name: 'AMBER', color: '#d97706', id: 'amber' },
  { name: 'WOODY', color: '#a16207', id: 'woody' },
  { name: 'MUSKY', color: '#78716c', id: 'musky' },
];

// Loose keyword mapping so a perfume's raw notes can be matched back to a wheel segment
const familyNoteKeywords = {
  citrus: ['citrus', 'bergamot', 'grapefruit', 'orange', 'lemon'],
  fresh: ['fresh', 'marine', 'aquatic', 'mint'],
  herbal: ['green tea', 'lavender', 'herbal', 'vetiver'],
  floral: ['floral', 'rose', 'freesia', 'jasmine'],
  fruity: ['fruity', 'raspberry', 'pear', 'peach', 'blackcurrant'],
  sweet: ['sweet', 'vanilla', 'caramel', 'praline', 'chocolate'],
  spicy: ['spicy', 'saffron', 'cinnamon', 'spices'],
  amber: ['amber', 'oriental'],
  woody: ['woody', 'sandalwood', 'cedarwood', 'oak'],
  musky: ['musky', 'musk', 'patchouli'],
};

export const familyForNote = (note) => {
  const lower = note.toLowerCase();
  return fragranceFamilies.find(f => (familyNoteKeywords[f.id] || []).some(k => lower.includes(k)));
};

// Generated once at module load so the wheel's connective threads stay stable for a session
const generateConnections = () => {
  const connections = [];
  const families = fragranceFamilies.map(f => f.id);

  for (let i = 0; i < families.length; i++) {
    for (let j = i + 1; j < families.length; j++) {
      const numLines = Math.floor(Math.random() * 15) + 1;
      const weight = Math.random();
      if (Math.random() > 0.4) {
        connections.push({
          source: families[i],
          target: families[j],
          weight: weight,
          count: numLines
        });
      }
    }
  }
  return connections;
};

export const globalConnections = generateConnections();
