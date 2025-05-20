import type { Product, QuizQuestion } from '@/lib/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lavender Relaxation",
    price: 29.99,
    category: "relaxation",
    scentFamily: "floral",
    rating: 4.8,
    image: "https://placehold.co/600x400",
    dataAiHint: "lavender aromatherapy",
    description: "Pure lavender essential oil for deep relaxation and stress relief.",
    longDescription: "Indulge in the calming embrace of our Lavender Relaxation blend. Sourced from the finest lavender fields, this pure essential oil is renowned for its ability to soothe the mind, ease tension, and promote restful sleep. Perfect for diffusing after a long day or adding to a warm bath for a tranquil escape.",
    ingredients: ["Lavandula Angustifolia (Lavender) Oil"],
  },
  {
    id: 2,
    name: "Eucalyptus Energy",
    price: 24.99,
    category: "energy",
    scentFamily: "herbal",
    rating: 4.6,
    image: "https://placehold.co/600x400",
    dataAiHint: "eucalyptus leaves",
    description: "Revitalizing eucalyptus blend to boost energy and clear the mind.",
    longDescription: "Invigorate your senses with Eucalyptus Energy. This powerful blend, featuring crisp eucalyptus, is designed to awaken your mind, clear respiratory passages, and provide a natural energy boost. Ideal for morning rituals or when you need to overcome sluggishness.",
    ingredients: ["Eucalyptus Globulus Leaf Oil", "Mentha Piperita (Peppermint) Oil"],
  },
  {
    id: 3,
    name: "Citrus Joy",
    price: 22.99,
    category: "happiness",
    scentFamily: "citrus",
    rating: 4.7,
    image: "https://placehold.co/600x400",
    dataAiHint: "citrus fruit",
    description: "Uplifting citrus blend for a joyful, energized atmosphere.",
    longDescription: "Brighten your day with Citrus Joy. This zesty fusion of sweet orange, lemon, and grapefruit oils creates an uplifting and cheerful ambiance. Diffuse it to inspire positivity, enhance creativity, or simply fill your space with pure happiness.",
    ingredients: ["Citrus Sinensis (Sweet Orange) Peel Oil", "Citrus Limon (Lemon) Peel Oil", "Citrus Paradisi (Grapefruit) Peel Oil"],
  },
  {
    id: 4,
    name: "Sandalwood Focus",
    price: 34.99,
    category: "focus",
    scentFamily: "woody",
    rating: 4.9,
    image: "https://placehold.co/600x400",
    dataAiHint: "sandalwood incense",
    description: "Grounding sandalwood aroma for enhanced concentration and focus.",
    longDescription: "Achieve mental clarity with Sandalwood Focus. The rich, earthy notes of sandalwood are expertly blended to promote a sense of calm and grounding, helping you concentrate and stay productive. A perfect companion for work, study, or meditation.",
    ingredients: ["Santalum Album (Sandalwood) Oil", "Cedrus Atlantica (Cedarwood) Bark Oil"],
  },
  {
    id: 5,
    name: "Peppermint Revive",
    price: 19.99,
    category: "energy",
    scentFamily: "minty",
    rating: 4.5,
    image: "https://placehold.co/600x400",
    dataAiHint: "peppermint candy",
    description: "Cool peppermint essential oil for invigorating refreshment.",
    longDescription: "Refresh and revitalize with Peppermint Revive. The cool, minty aroma of pure peppermint oil offers an instant pick-me-up, helping to sharpen focus, alleviate headaches, and provide a burst of cooling energy. Ideal for combating afternoon fatigue.",
    ingredients: ["Mentha Piperita (Peppermint) Oil"],
  },
  {
    id: 6,
    name: "Chamomile Sleep",
    price: 27.99,
    category: "relaxation",
    scentFamily: "herbal",
    rating: 4.7,
    image: "https://placehold.co/600x400",
    dataAiHint: "chamomile tea",
    description: "Gentle chamomile blend for peaceful sleep and relaxation.",
    longDescription: "Drift into serenity with Chamomile Sleep. This gentle, soothing blend of chamomile and lavender creates a tranquil environment conducive to deep, restful sleep. Diffuse in your bedroom to unwind and prepare for a night of peaceful dreams.",
    ingredients: ["Anthemis Nobilis (Roman Chamomile) Flower Oil", "Lavandula Angustifolia (Lavender) Oil"],
  },
  {
    id: 7,
    name: "Rosemary Clarity",
    price: 26.50,
    category: "focus",
    scentFamily: "herbal",
    rating: 4.6,
    image: "https://placehold.co/600x400",
    dataAiHint: "rosemary sprig",
    description: "Stimulating rosemary oil to enhance memory and mental clarity.",
    longDescription: "Unlock your cognitive potential with Rosemary Clarity. Known for its memory-enhancing properties, this vibrant rosemary essential oil helps improve concentration, boost alertness, and support overall brain function. Perfect for tasks requiring sharp focus.",
    ingredients: ["Rosmarinus Officinalis (Rosemary) Leaf Oil"],
  },
  {
    id: 8,
    name: "Ylang Ylang Harmony",
    price: 31.99,
    category: "happiness",
    scentFamily: "floral",
    rating: 4.8,
    image: "https://placehold.co/600x400",
    dataAiHint: "ylang ylang flower",
    description: "Exotic ylang ylang to promote harmony and reduce stress.",
    longDescription: "Find your inner balance with Ylang Ylang Harmony. The sweet, exotic floral notes of ylang ylang are celebrated for their ability to calm the nervous system, reduce stress, and uplift the spirit. Create a harmonious and romantic atmosphere in any space.",
    ingredients: ["Cananga Odorata (Ylang Ylang) Flower Oil"],
  }
];

export const CATEGORIES = ["All", "Relaxation", "Energy", "Happiness", "Focus"];
export const SCENT_FAMILIES = ["All", "Floral", "Herbal", "Citrus", "Woody", "Minty"];
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "rating", label: "By Rating" },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    key: "mood",
    question: "How are you generally feeling lately, or what mood do you want to cultivate?",
    options: [
      { id: 1, label: "Stressed or Anxious", value: "stressed" },
      { id: 2, label: "Low Energy or Fatigued", value: "fatigued" },
      { id: 3, label: "Seeking Mental Clarity", value: "seeking_clarity" },
      { id: 4, label: "Wanting to feel Happier", value: "seeking_happiness" },
      { id: 5, label: "Needing to Unwind", value: "needing_to_unwind" },
    ]
  },
  {
    key: "desiredEffect",
    question: "What's your primary goal for using aromatherapy?",
    options: [
      { id: 6, label: "Deep Relaxation & Sleep", value: "relaxation" },
      { id: 7, label: "Energy Boost & Vitality", value: "energy" },
      { id: 8, label: "Enhanced Focus & Concentration", value: "focus" },
      { id: 9, label: "Mood Improvement & Joy", value: "happiness" },
      { id: 10, label: "Stress Reduction", value: "stress_reduction" },
    ]
  },
  {
    key: "scentProfile",
    question: "Which scent family do you typically prefer?",
    options: [
      { id: 11, label: "Floral (e.g., Lavender, Rose)", value: "floral" },
      { id: 12, label: "Herbal (e.g., Eucalyptus, Rosemary)", value: "herbal" },
      { id: 13, label: "Citrus (e.g., Lemon, Orange)", value: "citrus" },
      { id: 14, label: "Woody (e.g., Sandalwood, Cedarwood)", value: "woody" },
      { id: 15, label: "Minty (e.g., Peppermint, Spearmint)", value: "minty" },
      { id: 16, label: "Spicy (e.g., Cinnamon, Clove)", value: "spicy" },
      { id: 17, label: "Earthy (e.g., Patchouli, Vetiver)", value: "earthy" },
    ]
  },
  {
    key: "environment",
    question: "Where do you primarily envision using aromatherapy products?",
    options: [
      { id: 18, label: "Home (Living Room, Bedroom)", value: "home" },
      { id: 19, label: "Office or Workspace", value: "office" },
      { id: 20, label: "During Meditation or Yoga", value: "meditation_yoga" },
      { id: 21, label: "In the Bath or for Self-Care Rituals", value: "self_care_bath" },
    ]
  }
];

export const INITIAL_PRODUCT_STATE = {
  category: "All",
  sortBy: "featured",
  filters: {
    scentFamily: "All",
    priceRange: [0, 50] as [number, number],
  }
};

export const INITIAL_CART_STATE = {
  items: [],
  isOpen: false,
};
