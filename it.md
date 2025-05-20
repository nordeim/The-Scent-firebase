md
# Technical Design Specification: Aroma Genius E-commerce Platform

## 1. Overview

The Aroma Genius project is envisioned as a modern, AI-powered e-commerce platform specializing in aromatherapy products. Its core features include product browsing, filtering, sorting, viewing product details, adding products to a shopping cart, persistent cart state, and a unique AI-driven quiz that recommends products based on user preferences. The platform is built using the Next.js 14 App Router, leveraging its capabilities for both server-side and client-side rendering, API routes (or server actions/functions), and file-system-based routing.

The primary goal of this document is to provide a detailed technical specification of the existing codebase. It describes the project's architecture, outlines the directory structure, and provides in-depth explanations for key files, including their purpose, functionality, interfaces, and relevant code snippets. This TDS is intended to serve as:

*   A comprehensive guide for new developers onboarding to the project.
*   A reference for the Quality Assurance (QA) team to understand the system's design and expected behavior.
*   A foundational document for planning and implementing future features and enhancements.

### 1.1 Architecture and Design Principles

The application follows a component-based architecture using React, organized within the Next.js App Router structure. Key architectural decisions and design principles include:

*   **Next.js App Router:** Utilizes the latest Next.js routing paradigm, allowing for co-location of components, styles, tests, and other files. It supports Server Components by default for performance and SEO, while enabling Client Components where interactivity is required (e.g., state management, event handling, hooks).
*   **Component-Based Design:** The UI is broken down into reusable components (e.g., `ProductCard`, `Button`, `Input`, `Navbar`, `Footer`). This promotes modularity, maintainability, and reusability across different pages and sections of the application. Components are organized logically within the `src/components` directory.
*   **Global State Management (React Context):** For client-side application state that needs to be accessed by multiple components across the application (e.g., cart items, product filters, quiz state), React's Context API combined with `useReducer` is used. The `AppContext` provides a centralized store and a dispatch mechanism for state updates.
*   **Serverless Functions (`'use server'`):** Sensitive or server-only logic, such as interacting with AI models or potentially future API calls to a backend, is designated using the `'use server'` directive. This ensures these operations are performed securely on the server side.
*   **UI Library (Shadcn UI):** The project utilizes components from Shadcn UI, which are built on top of Radix UI and styled with Tailwind CSS. This provides a set of accessible and customizable UI primitives, accelerating development and ensuring visual consistency.
*   **Styling (Tailwind CSS):** Tailwind CSS is used for styling, providing a utility-first approach that enables rapid UI development directly within JSX. This results in highly customizable designs and reduces the need for custom CSS files.
*   **AI Integration (GenKit):** The AI recommendation feature leverages the GenKit library to interact with large language models via a defined flow and prompt. This is handled on the server side.
*   **Data Persistence (`localStorage`):** The shopping cart state is persisted in the user's browser using `localStorage`. While simple for a demo, this is a client-side solution and would typically be replaced by a backend database for a production application with user accounts.
*   **TypeScript:** The entire codebase is written in TypeScript, providing static type checking to improve code reliability and maintainability. Zod is used in conjunction with GenKit for schema validation.

### 1.2 Limitations and Current Status

It is important to note the current status and limitations reflected in the codebase, as reviewed:

*   **Mock Data:** Product data is currently hardcoded using `MOCK_PRODUCTS`. There is no backend integration for dynamic product catalogs.
*   **Incomplete Features:** The checkout process is not fully implemented (Stripe integration is commented out), and features like promo codes and dynamic shipping/tax calculations are placeholders. The admin page is also a placeholder.
*   **Client-Side Filtering/Sorting:** Filtering and sorting are performed on the client side on the full list of mock products. This is not scalable for a large number of products.
*   **Basic AI Integration:** The AI recommendation is based on a simple prompt and matches recommendations by product name, which could be unreliable. It also uses the static mock product list.
*   **No Authentication/User Accounts:** The application does not currently support user registration, login, or personalized features beyond the client-side cart persistence.

This TDS documents the codebase *as it is*, including these limitations, providing a clear picture of the starting point for future development.

## 2. Codebase Directory Structure

The project follows a standard Next.js App Router directory structure, primarily centered within the `src` directory.
```
.
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── @types/             # (Potentially) Custom type definitions
│   ├── ai/                 # AI-related code
│   │   └── flows/
│   │       └── recommend-scents.ts # AI recommendation flow (GenKit)
│   ├── app/                # App Router pages and layouts
│   │   ├── (marketing)/    # Route group for marketing pages (homepage, quiz)
│   │   │   ├── page.tsx    # Homepage
│   │   │   └── quiz/
│   │   │       └── page.tsx  # Quiz page
│   │   ├── admin/
│   │   │   └── page.tsx    # Admin placeholder page
│   │   ├── cart/
│   │   │   └── page.tsx    # Cart page
│   │   ├── checkout/
│   │   │   └── page.tsx  # Checkout page (incomplete)
│   │   ├── products/
│   │   │   ├── [productId]/
│   │   │   │   └── page.tsx  # Product detail page (dynamic route)
│   │   │   └── page.tsx    # Product listing page
│   │   ├── globals.css     # Global styles
│   │   └── layout.tsx      # Root layout for all pages
│   ├── components/         # Reusable React components
│   │   ├── cart/           # Cart related components
│   │   │   ├── CartClient.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── layout/         # Layout specific components (Navbar, Footer)
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── products/       # Product related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── ProductGrid.tsx
│   │   ├── ui/             # Shadcn UI components (generated)
│   │   │   └── ...
│   │   └── ThemeToggle.tsx   # Component for switching themes
│   ├── contexts/         # React Context providers
│   │   └── AppContext.tsx    # Global application context
│   ├── hooks/              # Custom React hooks
│   │   └── use-toast.ts      # Hook for displaying toasts
│   ├── lib/                # Utility functions, constants, types
│   │   ├── constants.ts      # Application constants (mock data, options, etc.)
│   │   └── types.ts          # TypeScript type definitions
│   └── providers/          # Context or wrapper providers
│       └── ThemeProvider.tsx # Theme context provider
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration (for Tailwind)
├── README.md               # Project README
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── genkit.dev.ts           # GenKit development configuration
```
### 2.1 Directory Purpose Explanation

*   **`public/`**: Hosts static assets directly accessible from the root of the application (e.g., `/images/logo.png`).
*   **`src/`**: Contains the main application source code.
    *   **`ai/`**: Code related to AI integrations, specifically the GenKit flows.
    *   **`app/`**: Contains all routes and layouts for the App Router. Directories within `app` define routes. Parentheses `()` create route groups that don't affect the URL path.
    *   **`components/`**: Reusable React components, organized by feature area (`cart`, `layout`, `products`) or purpose (`ui`).
    *   **`contexts/`**: React Context providers for global state management.
    *   **`hooks/`**: Custom React hooks.
    *   **`lib/`**: Utility functions, shared constants, and TypeScript type definitions.
    *   **`providers/`**: Wrapper components that provide context or other global functionality.
*   **Root Files (`.eslintrc.json`, `next.config.mjs`, etc.)**: Configuration files for linting, Next.js, package management, etc.

## 3. Detailed File Listing

This section provides a detailed breakdown of key files within the `src` directory, explaining their role, purpose, and relevant implementation details, often including code snippets.

### 3.1 Root Layout and Templates

#### `src/app/layout.tsx`

*   **Description:** Defines the root layout for the entire application.
*   **Purpose:** Wraps all pages with essential HTML structure (`<html>`, `<body>`), includes global CSS, sets up necessary context providers (Theme, App State), defines application metadata (title, description), and renders persistent layout components like the `Navbar` and `Footer`.
*   **Key Features/Logic:**
    *   Sets `lang="en"` and uses `suppressHydrationWarning` on `<html>` and `<body>` (often needed with client-side theme manipulation libraries like `next-themes`).
    *   Applies global font variables (`GeistSans`, `GeistMono`) and basic styling to the body.
    *   Includes `ThemeProvider` to enable light/dark mode switching across the application.
    *   Includes `AppContextProvider` to make global application state and dispatch available to all components.
    *   Structures the content using a flex column layout (`min-h-screen`) to ensure the footer stays at the bottom.
    *   Renders the `Navbar` at the top, `Footer` at the bottom, and the page content (`children`) in between within a `main` tag.
    *   Includes the `Toaster` component for displaying notifications (`react-hot-toast` or similar, integrated via Shadcn UI).
    *   Defines static `metadata` for the application head.
*   **Interfaces/Props:** Accepts a `children` prop of type `React.ReactNode`.
*   **Dependencies:** Imports `Metadata` from `next`, fonts from `geist`, global CSS, `ThemeProvider`, `AppContextProvider`, `Navbar`, `Footer`, and `Toaster`.
*   **Code Snippet (Structure):**
```
typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/providers/ThemeProvider'; // Theme context
import { AppContextProvider } from '@/contexts/AppContext'; // App state context
import Navbar from '@/components/layout/Navbar'; // Navigation Bar
import Footer from '@/components/layout/Footer'; // Footer
import { Toaster } from "@/components/ui/toaster"; // Toast notification container
import React from 'react'; // Import React for Readonly type

// Application metadata
export const metadata: Metadata = {
  title: 'The Scent - Discover Your Signature Scent',
  description: 'AI-Powered Aromatherapy E-commerce Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML tag with language and hydration warning suppression
    <html lang="en" suppressHydrationWarning>
      {/* Body tag with font classes and hydration warning suppression */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Theme Provider for light/dark mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Application State Context Provider */}
          <AppContextProvider>
            {/* Flex column layout for sticky footer */}
            <div className="flex flex-col min-h-screen">
              <Navbar /> {/* Navigation Bar */}
              <main className="flex-grow"> {/* Main content area, takes up remaining space */}
                {children} {/* Page content is rendered here */}
              </main>
              <Footer /> {/* Footer */}
            </div>
            <Toaster /> {/* Toaster for notifications */}
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```
*   **Explanation:** This is the highest-level component wrapping the entire application. It establishes the core environment by including fonts, global styles, and setting up the theme and global application state providers. The flex layout ensures the footer is always at the bottom, even on pages with minimal content. `children` is a special prop in layouts and templates representing the nested route segments or page.

#### `src/app/template.tsx` (Not Found)

*   **Description:** This file was not found in the codebase.
*   **Purpose:** In Next.js App Router, an optional `template.tsx` file can wrap each page within a layout. Templates have their own state and effects that reset on navigation, unlike layouts. They are useful for per-page exit/entry animations or providers that need to re-mount per page.
*   **Current Status:** The absence of this file means there is no root-level template applied to pages. Layouts provide persistent UI across routes, which is sufficient for this application's current needs.

### 3.2 Global State Management

#### `src/contexts/AppContext.tsx`

*   **Description:** Defines the React Context and Provider for the global application state.
*   **Purpose:** Centralizes state management for products, product filtering/sorting, the shopping cart, and the AI quiz. It provides a single `state` object and a `dispatch` function to update this state to all consuming components via the `useAppContext` hook. It also handles side effects like saving/loading the cart from `localStorage` and triggering the AI recommendation flow.
*   **Key Features/Logic:**
    *   Uses `useReducer` for `productState` and `cartState`, managed by `productReducer` and `cartReducer` respectively. Reducers handle state transitions based on dispatched actions.
    *   Uses `useState` for simpler state like `products`, `quizActive`, `quizStep`, etc.
    *   Initializes `products` with `MOCK_PRODUCTS`.
    *   Initializes `productState` and `cartState` with their respective initial states.
    *   **`productReducer`:** Handles actions (`SET_CATEGORY`, `SET_SORT`, `SET_FILTER`, `RESET_FILTERS`) to update the product filtering and sorting state.
    *   **`cartReducer`:** Handles cart actions (`ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `TOGGLE_CART`, `CLOSE_CART`, `CLEAR_CART`, `INITIALIZE_CART`). Includes logic for incrementing quantity or adding new items, removing items, and handling quantity updates (including removing items if quantity <= 0).
    *   **`combinedDispatch`:** A wrapper function combining `productDispatch`, `cartDispatch`, and direct state updates for quiz state. It determines which state piece to update based on the action type. Includes a side effect to show a toast notification when an item is added to the cart.
    *   **Quiz State Management:** Handles quiz flow actions (`START_QUIZ`, `NEXT_STEP`, `SET_QUIZ_STEP`, `SUBMIT_QUIZ_START`, `SUBMIT_QUIZ_SUCCESS`, `SUBMIT_QUIZ_ERROR`, `RESET_QUIZ`). Manages quiz progress, collects answers, triggers the `recommendScents` AI flow, and updates state based on the AI response (including fallback logic if AI matches are insufficient).
    *   **`localStorage` Persistence:**
        *   A `useEffect` hook runs on mount to load cart items from `localStorage` and dispatches `INITIALIZE_CART`.
        *   Another `useEffect` hook runs whenever `cartState.items` changes to save the current cart items to `localStorage`.
    *   **Context Provider (`AppContextProvider`):** Provides the combined state object and the `combinedDispatch` function to its children.
    *   **`useAppContext` Hook:** A custom hook for components to easily access the context value. Includes a check to ensure the hook is used within the `AppContextProvider`.
*   **Interfaces/Props:**
    *   Uses types imported from `@/lib/types.ts` (e.g., `Product`, `CartItem`, `AppState`, `AppAction`).
    *   `AppContextProvider` accepts a `children` prop (`ReactNode`).
    *   `useAppContext` returns the context value (`AppState & { dispatch: React.Dispatch<AppAction> }`).
*   **Dependencies:** Imports React hooks, types, constants (`MOCK_PRODUCTS`, `INITIAL_PRODUCT_STATE`, `INITIAL_CART_STATE`, `QUIZ_QUESTIONS`), the AI recommendation flow (`recommendScents`), and the `useToast` hook.
*   **Code Snippet (Reducers & Dispatch Structure):**
```
typescript
// src/contexts/AppContext.tsx
"use client"; // Client component to use hooks and context

import type { ReactNode } from 'react';
import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import type {
  Product,
  CartItem,
  AppState,
  ProductAction,
  CartAction,
  QuizAction, // Assuming this type exists or is covered by AppAction
  AppAction,
  ProductState,
  CartState
} from '@/lib/types'; // Import types
import { MOCK_PRODUCTS, INITIAL_PRODUCT_STATE, INITIAL_CART_STATE, QUIZ_QUESTIONS } from '@/lib/constants'; // Import constants
import { recommendScents, type RecommendScentsInput } from '@/ai/flows/recommend-scents'; // Import AI flow
import { useToast } from '@/hooks/use-toast'; // Import toast hook

// --- Reducers ---

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_FILTER':
      // Merge new filters into existing filters
      // This assumes filters payload is an object like { price: [min, max] } or { scentFamilies: { scent1: true, scent2: false } }
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return INITIAL_PRODUCT_STATE;
    default:
      return state;
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        // Item exists, increment quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updatedItems };
      }
      // Item is new, add with quantity 1
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      // Filter out the item by id
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      // Remove item if quantity is 0 or less
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      // Update quantity for the item
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    // Other cart actions...
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'INITIALIZE_CART': // Action to set initial cart items from storage
        // Ensure payload is an array of CartItem and handle potential type issues from localStorage
        const initialItems = Array.isArray(action.payload) ? action.payload : [];
        return { ...state, items: initialItems };
    default:
      return state;
  }
};

// --- Context Creation ---

// Define the shape of the context value
interface AppContextValue extends AppState {
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// --- Context Provider Component ---

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // State using useState (e.g., for products, quiz simple states)
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS); // Full list of products
  const [productState, productDispatch] = useReducer(productReducer, INITIAL_PRODUCT_STATE); // Filter/Sort state
  const [cartState, cartDispatch] = useReducer(cartReducer, INITIAL_CART_STATE); // Cart state

  // Quiz specific state using useState
  const [quizActive, setQuizActive] = useState(false); // Is quiz currently active?
  const [quizStep, setQuizStep] = useState(0); // Current step in the quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({}); // Collected quiz answers
  const [quizResults, setQuizResults] = useState<Product[]>([]); // Products recommended by AI
  const [isLoadingQuizResults, setIsLoadingQuizResults] = useState(false); // Loading state for AI call

  const { toast } = useToast(); // Hook for toasts

  // --- Combined Dispatch Function ---
  // This function routes actions to the correct reducer or state updater
  const combinedDispatch = useCallback(async (action: AppAction) => { // Use useCallback if passing down
    // Route actions to appropriate reducer or state updater
    if (['SET_CATEGORY', 'SET_SORT', 'SET_FILTER', 'RESET_FILTERS'].includes(action.type)) {
      productDispatch(action as ProductAction);
    } else if (['ADD_ITEM', 'REMOVE_ITEM', 'UPDATE_QUANTITY', 'TOGGLE_CART', 'CLOSE_CART', 'CLEAR_CART', 'INITIALIZE_CART'].includes(action.type)) {
      cartDispatch(action as CartAction);
      // Side effect: show toast for ADD_ITEM
      if (action.type === 'ADD_ITEM') {
        // Assuming the payload of ADD_ITEM is the product itself
        const productToAdd = (action as {payload: Product}).payload;
        toast({
          title: "Added to Cart",
          description: `${productToAdd.name} has been added to your cart.`,
          // Optionally add an action button to view cart
          // action: <ToastAction altText="View Cart">View Cart</ToastAction>,
        });
      }
    } else if (action.type === 'SET_PRODUCTS') {
        setProducts(action.payload);
    }
    // Quiz actions handled directly
    else {
        switch (action.type) {
            case 'START_QUIZ':
                setQuizActive(true);
                setQuizStep(0);
                setQuizAnswers({});
                setQuizResults([]);
                setIsLoadingQuizResults(false); // Reset loading state
                break;
            case 'NEXT_STEP':
                // Update answers and move to next step, or submit if last step
                // Payload is { key: string, value: string }
                setQuizAnswers(prev => ({ ...prev, [action.payload.key]: action.payload.value }));
                if (quizStep < QUIZ_QUESTIONS.length - 1) {
                    setQuizStep(s => s + 1);
                } else {
                    // If last step, trigger the AI submission process
                    combinedDispatch({ type: 'SUBMIT_QUIZ_START' });
                }
                break;
            case 'SET_QUIZ_STEP':
                // Directly set quiz step (e.g., for navigation or resetting)
                setQuizStep(action.payload);
                break;
            case 'SUBMIT_QUIZ_START':
                setIsLoadingQuizResults(true);
                // Build input for the AI flow from collected answers
                const recommendInput: RecommendScentsInput = {
                  mood: quizAnswers['mood'], // Assuming quiz questions collect these keys
                  desiredEffect: quizAnswers['desiredEffect'],
                  scentProfile: quizAnswers['scentProfile'], // Assuming this is a single string
                  // Note: If scentProfile is multiple choices, the UI/quizAnswers structure
                  // and the AI prompt would need adjustment.
                };
                // Call the server AI flow function
                try {
                  const aiResult = await recommendScents(recommendInput);
                  // Process AI result and find matching products
                  const recommendedNames = aiResult.productRecommendations;

                  // Find products from the full list that match recommended names
                  let matchedProducts = products.filter(product =>
                      recommendedNames.some(recName =>
                          recName.toLowerCase().includes(product.name.toLowerCase()) // Simple fuzzy matching by name
                      )
                  );

                  // Fallback: If no products matched, maybe suggest some popular ones or first few?
                  // Or match by scent family if AI returns it?
                   if (matchedProducts.length === 0 && recommendedNames.length > 0) {
                       console.warn("AI recommendations did not match any mock products. Using first few products as fallback.");
                       // Fallback example: Take the first few products from the list
                       matchedProducts = products.slice(0, recommendedNames.length > 3 ? 3 : recommendedNames.length);
                       // Or try matching by scent families from prompt input
                       // matchedProducts = products.filter(p => p.scentFamily.toLowerCase() === recommendInput.scentProfile.toLowerCase());
                   }


                  combinedDispatch({ type: 'SUBMIT_QUIZ_SUCCESS', payload: matchedProducts });
                  // Show a toast with the AI's reasoning
                  toast({ title: "Quiz Results Ready!", description: aiResult.reasoning });
                } catch (error) {
                    // Handle errors from the AI call
                    console.error("Error recommending scents:", error);
                    toast({ variant: "destructive", title: "Quiz Error", description: "Could not get recommendations. Please try again." });
                    combinedDispatch({ type: 'SUBMIT_QUIZ_ERROR' }); // Dispatch error action
                }
                break;
            case 'SUBMIT_QUIZ_SUCCESS':
                setIsLoadingQuizResults(false);
                setQuizResults(action.payload); // Set the matched product results
                setQuizActive(false); // Deactivate quiz after getting results
                break;
            case 'SUBMIT_QUIZ_ERROR':
                setIsLoadingQuizResults(false);
                setQuizResults([]); // Clear results on error
                setQuizActive(false); // Deactivate quiz on error
                break;
            case 'RESET_QUIZ':
                setQuizActive(false);
                setQuizStep(0);
                setQuizAnswers({});
                setQuizResults([]);
                setIsLoadingQuizResults(false);
                break;
            default:
                // Log unrecognized actions for debugging
                console.warn('Unrecognized action type:', action.type);
                break;
        }
    }
  }, [productDispatch, cartDispatch, setProducts, setQuizActive, setQuizStep, setQuizAnswers, setQuizResults, setIsLoadingQuizResults, toast, quizStep, quizAnswers, products]); // Dependencies for useCallback

  // --- localStorage Effects ---

  // Effect to load cart on mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('aromaGeniusCart');
    if (storedCartItems) {
      try {
        // Parse the stored JSON string back into an array of CartItem
        const items: CartItem[] = JSON.parse(storedCartItems);
        // Dispatch action to initialize the cart state with loaded items
        cartDispatch({ type: 'INITIALIZE_CART', payload: items });
      } catch (error) {
        // Log parsing errors and potentially clear invalid data
        console.error("Failed to parse cart data from localStorage", error);
        localStorage.removeItem('aromaGeniusCart'); // Clear corrupted data
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save cart whenever items change
  useEffect(() => {
    // Only save if there are items to avoid saving empty array unnecessarily or overwriting on initial load
    if (cartState.items.length > 0) {
      localStorage.setItem('aromaGeniusCart', JSON.stringify(cartState.items));
    } else {
      // Remove the item from localStorage if the cart becomes empty
      localStorage.removeItem('aromaGeniusCart');
    }
  }, [cartState.items]); // Rerun this effect whenever the cartState.items array changes

  // --- Context Value ---
  // Combine all state pieces into a single value object
  const state: AppState = {
    products,
    productState,
    cartState,
    quizActive,
    quizStep,
    quizAnswers,
    quizResults,
    isLoadingQuizResults,
  };

  return (
    // Provide the state and the combined dispatch function to the context
    <AppContext.Provider value={{ ...state, dispatch: combinedDispatch }}>
      {children} {/* Render children components */}
    </AppContext.Provider>
  );
};

// --- Custom Hook for Consumption ---
// This hook makes it easier for components to access the AppContext value
export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (context === undefined) {
    // Throw an error if the hook is used outside of the provider, aiding debugging
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
```
*   **Explanation:** This file is central to the application's state management. `useReducer` is used effectively for state that has more complex transitions based on discrete actions (product filters, cart items), while `useState` handles simpler boolean or direct value states (quiz progress, loading). The `combinedDispatch` function acts as a traffic controller for all actions, directing them to the appropriate state update logic. The `useEffect` hooks demonstrate how to handle side effects like persistence (`localStorage`) and initialization. The quiz logic within the dispatch shows how external (AI) calls are integrated into the state update flow, managing loading states and results. The `useAppContext` hook simplifies consuming the context in functional components, providing type safety and ensuring the hook is used within the correct provider. The AI integration includes basic fallback logic if recommended product names don't directly match the mock data.

### 3.3 Layout Components

#### `src/components/layout/Navbar.tsx`

*   **Description:** The navigation bar component displayed at the top of every page (via `RootLayout`).
*   **Purpose:** Provides site branding, main navigation links, a theme toggle, and a shopping cart toggle/indicator. It also includes a mobile menu for smaller screens.
*   **Key Features/Logic:**
    *   Uses Next.js `Link` for navigation to ensure client-side transitions.
    *   Displays the site logo/title.
    *   Renders main navigation links (`Home`, `Products`, `Quiz`).
    *   Integrates the `ThemeToggle` component.
    *   Displays a shopping cart icon, showing the total number of items in the cart (`cartState.items.length`). Clicking the icon dispatches a `TOGGLE_CART` action to open/close the cart sidebar.
    *   Includes a mobile menu (`Sheet`) triggered by a hamburger icon, providing access to navigation links and theme toggle on small screens.
    *   Uses `useAppContext` to access `cartState` (for item count) and `dispatch` (for toggling the cart).
*   **Interfaces/Props:** None. Relies on `useAppContext`.
*   **Dependencies:** Imports `Link` from `next/link`, components from Shadcn UI (`Button`, `Sheet`, `SheetTrigger`, `SheetContent`, `Separator`), custom components (`ThemeToggle`), icons (`Menu`, `ShoppingCart`), and the `useAppContext` hook. Includes `useState` for mobile sheet control.
*   **Code Snippet (Structure):**