export const CUISINES = ['Italian', 'Mexican', 'Indian', 'Japanese', 'American', 'Mediterranean'];
export const TAGS = ['vegan', 'vegetarian', 'gluten-free', 'keto', 'dairy-free', 'paleo'];

// PUBLIC_INTERFACE
export function getAllTags() {
  /** Return list of dietary tags supported by mock data. */
  return TAGS;
}

// PUBLIC_INTERFACE
export function getAllCuisines() {
  /** Return list of cuisines supported by mock data. */
  return CUISINES;
}

const lorem =
  'A delightful dish crafted with fresh ingredients and balanced flavors. Perfect for weeknights and special occasions alike.';

function img(seed) {
  const pics = [
    'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
  ];
  return pics[seed % pics.length];
}

const MOCK = Array.from({ length: 24 }).map((_, i) => {
  const cuisine = CUISINES[i % CUISINES.length];
  const dietary = [TAGS[i % TAGS.length], TAGS[(i + 3) % TAGS.length]];
  const rating = Math.round((3 + (i % 3) + Math.random()) * 10) / 10;
  const calories = 250 + (i % 5) * 60;
  return {
    id: String(i + 1),
    title: `${cuisine} Favorite #${i + 1}`,
    image: img(i),
    cuisine,
    dietary,
    rating,
    time: `${20 + (i % 6) * 5} mins`,
    calories,
    description: lorem,
    ingredients: [
      { name: 'Olive Oil', amount: '2 tbsp' },
      { name: 'Garlic', amount: '3 cloves' },
      { name: 'Tomatoes', amount: '2 cups' },
      { name: 'Salt & Pepper', amount: 'to taste' },
    ],
    steps: [
      'Prep all ingredients and preheat pan.',
      'Sauté aromatics until fragrant.',
      'Add main components and simmer.',
      'Season, garnish, and serve warm.',
    ],
    nutrition: [
      { label: 'Calories', value: `${calories}` },
      { label: 'Protein', value: `${8 + (i % 10)} g` },
      { label: 'Carbs', value: `${30 + (i % 20)} g` },
      { label: 'Fat', value: `${9 + (i % 6)} g` },
    ],
  };
});

// PUBLIC_INTERFACE
export const mockApi = {
  /** Mock request router that emulates a minimal backend for the demo. */
  async request(path) {
    await new Promise((r) => setTimeout(r, 250));
    const url = new URL(path, 'http://example.local');

    if (url.pathname === '/recipes') {
      const q = (url.searchParams.get('q') || '').toLowerCase();
      const cuisine = url.searchParams.get('cuisine') || '';
      const tags = (url.searchParams.get('tags') || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const limit = parseInt(url.searchParams.get('limit') || '12', 10);

      let filtered = MOCK;
      if (q) {
        filtered = filtered.filter(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            (r.description || '').toLowerCase().includes(q)
        );
      }
      if (cuisine) {
        filtered = filtered.filter((r) => r.cuisine === cuisine);
      }
      if (tags.length) {
        filtered = filtered.filter((r) =>
          tags.every((t) => r.dietary.includes(t))
        );
      }

      const start = (page - 1) * limit;
      const items = filtered.slice(start, start + limit);
      return { items, total: filtered.length, page, limit };
    }

    // Match /recipes/:id safely without escape issues
    const pathName = url.pathname;
    const rx = new RegExp('^/recipes/(\\w+)$');
    const match = pathName.match(rx);
    if (match) {
      const id = match[1];
      const r = MOCK.find((x) => x.id === id);
      if (!r) throw new Error('Recipe not found');
      return r;
    }

    throw new Error(`Unknown mock path ${path}`);
  },
};
