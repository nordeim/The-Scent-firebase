
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string; // "relaxation", "energy", "happiness", "focus"
  scentFamily: string; // "floral", "herbal", "citrus", "woody", "minty"
  rating: number;
  image: string;
  description: string;
  longDescription?: string; // Optional detailed description
  ingredients?: string[]; // Optional list of ingredients
  dataAiHint?: string; // For placeholder image generation
}

export interface CartItem extends Product {
  quantity: number;
}

export interface QuizQuestionOption {
  id: number;
  label: string;
  value: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizQuestionOption[];
  key: 'mood' | 'desiredEffect' | 'scentProfile' | 'environment'; // Key to map answer
}

export interface ProductFilters {
  category: string;
  scentFamily: string;
  priceRange: [number, number];
}

export interface ProductState {
  category: string;
  sortBy: string; // "featured", "priceLow", "priceHigh", "newest"
  filters: ProductFilters;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface AppState {
  products: Product[];
  productState: ProductState;
  cartState: CartState;
  quizActive: boolean;
  quizStep: number;
  quizAnswers: Record<string, string>; // e.g. { mood: "stressed", desiredEffect: "relaxation" }
  quizResults: Product[]; // Products recommended by AI
  isLoadingQuizResults: boolean;
}

export type ProductAction =
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<ProductFilters> }
  | { type: 'RESET_FILTERS' };

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number } // Product ID
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' }
  | { type: 'INITIALIZE_CART'; payload: CartItem[] };

export type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'NEXT_STEP'; payload: { key: string; value: string } }
  | { type: 'SET_QUIZ_STEP'; payload: number }
  | { type: 'SUBMIT_QUIZ_START' }
  | { type: 'SUBMIT_QUIZ_SUCCESS'; payload: Product[] }
  | { type: 'SUBMIT_QUIZ_ERROR' }
  | { type: 'RESET_QUIZ' };

export type AppAction = ProductAction | CartAction | QuizAction | { type: 'SET_PRODUCTS', payload: Product[] };
