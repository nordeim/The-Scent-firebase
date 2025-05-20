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
*   **Code Snippet (Structure):**`useAppContext`.
    *   Renders the `ProductFilters` component in a sidebar or a dedicated section.
    *   Renders the `ProductGrid` component, which automatically displays the products based on the filters and sorting applied via the `AppContext`.
    *   Provides a simple layout to arrange the filters and the product grid.
*   **Interfaces/Props:** None. Relies on `useAppContext` and includes child components `ProductFilters` and `ProductGrid`.
*   **Dependencies:** Imports `useAppContext` (though it might only be used by child components, the parent likely needs `"use client"`), `ProductFilters`, and `ProductGrid`.
*   **Code Snippet (Structure):**

```
tsx
// src/app/products/page.tsx
"use client"; // Client component to allow interactivity of child components and context usage

import ProductFilters from '@/components/products/ProductFilters'; // Component for filtering controls
import ProductGrid from '@/components/products/ProductGrid';     // Component for displaying the product grid

export default function ProductsPage() {
  // Although useAppContext might not be directly used here,
  // the child components ProductFilters and ProductGrid rely on it,
  // and rendering client components often requires the parent to be a client component too.
  // const {  } = useAppContext();

  return (
    // Main container for the products page
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Layout for filters and product grid */}
      {/* Using a grid to create a sidebar for filters on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar - takes 1 column on medium screens and above */}
        <aside className="md:col-span-1">
          <ProductFilters /> {/* Render the filters component */}
        </aside>

        {/* Product Grid - takes 3 columns on medium screens and above */}
        <section className="md:col-span-3">
          <ProductGrid /> {/* Render the product grid component */}
        </section>
      </div>
    </div>
  );
}
```

*   **Explanation:** This page acts as a container for the product listing functionality. It's a relatively simple component that focuses on arranging its child components (`ProductFilters` and `ProductGrid`) using a responsive grid layout provided by Tailwind CSS. The actual filtering and sorting logic reside within the `ProductFilters` and `ProductGrid` components themselves, interacting with the global `AppContext`. Making this page a `"use client"` component ensures that the child components, which rely heavily on client-side state and hooks, function correctly.

#### `src/app/products/[productId]/page.tsx`

*   **Description:** The dynamic page for displaying details of a single product.
*   **Purpose:** Shows comprehensive information about a specific product, including its image, description, price, and provides an "Add to Cart" button for this particular item.
*   **Key Features/Logic:**
    *   This is a Server Component by default, capable of fetching data for the specific product based on the dynamic `productId` from the URL segment.
    *   Accesses the `productId` from the `params` prop provided by Next.js App Router for dynamic routes.
    *   Fetches the product data matching the `productId`. Since there's no backend, it currently searches within the `MOCK_PRODUCTS` array using the `productId`.
    *   Handles the case where a product is not found for the given `productId` (e.g., returning a 404 page or a "Product Not Found" message).
    *   Displays the product's image (using `next/image`), name, description, and price.
    *   Includes an "Add to Cart" button that, when clicked, dispatches an `ADD_ITEM` action to the `AppContext`.
    *   Requires the "Add to Cart" button and potentially other interactive elements to be client components. This can be achieved by wrapping them in a `"use client"` component or passing the product data to a separate client component responsible for the interactive parts.
    *   Uses `useAppContext` in the client-side portion (e.g., within the button component) to access the `dispatch` function.
    *   Uses Shadcn UI components for layout and styling.
*   **Interfaces/Props:** Receives a `params` prop, which is an object containing dynamic route segments. For this route, it will be `{ productId: string }`.
*   **Dependencies:** Imports type definitions (`Product`), constants (`MOCK_PRODUCTS`), and potentially a client component wrapper for interactive elements (e.g., `AddToCartButton.tsx`). Imports `Image` from `next/image`.
*   **Code Snippet (Example Structure):**

```
tsx
// src/app/products/[productId]/page.tsx
// This is a Server Component by default

import { MOCK_PRODUCTS } from '@/lib/constants'; // Import mock product data
import type { Product } from '@/lib/types'; // Import Product type
import Image from 'next/image'; // For displaying product image

// Assume you have a client component for the add to cart button
import AddToCartButton from './AddToCartButton'; // Example: Client component for Add to Cart

// Define the props shape for the dynamic route page
interface ProductPageProps {
  params: {
    productId: string; // The dynamic segment from the URL
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = params.productId; // Get the product ID from the URL

  // Find the product in the mock data based on the ID
  // In a real app, this would be an API call to a backend
  const product: Product | undefined = MOCK_PRODUCTS.find(p => p.id === productId);

  // Handle case where product is not found
  if (!product) {
    // You could render a 404 page or a custom not found message
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product with ID "{productId}" could not be found.</p>
        {/* Optionally add a link back to the products page */}
         {/* <Link href="/products">View all products</Link> */}
      </div>
    );
  }

  // Render the product details if the product is found
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="relative h-80 md:h-auto aspect-square overflow-hidden rounded-lg border">
           <Image
              src={product.image} // Product image source
              alt={product.name} // Alt text
              fill // Fill the container
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
              className="object-cover object-center" // Ensure image covers container
            />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1> {/* Product name */}
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ${product.price.toFixed(2)} {/* Product price */}
            </p>
            {/* Product Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            {/* Potentially add scent family, ingredients, usage, etc. */}
             {/* <p className="mt-4 text-sm">Scent Family: {product.scentFamily}</p> */}
          </div>

          {/* Add to Cart Button (Rendered by a Client Component) */}
          {/* Pass the product data to the client component */}
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Potentially add related products section here */}
    </div>
  );
}

// Example of AddToCartButton.tsx (needs to be in a separate file and be a "use client" component)
// src/app/products/[productId]/AddToCartButton.tsx
/*
"use client";

import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import type { Product } from '@/lib/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { dispatch } = useAppContext();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full md:w-auto">
      Add to Cart
    </Button>
  );
}
*/
```

*   **Explanation:** This dynamic route page is primarily a Server Component to fetch the specific product data based on the URL parameter `productId`. This is a common pattern for detail pages to enable server-side rendering of content for faster initial load and SEO. Since the "Add to Cart" functionality is interactive and needs access to client-side state (the cart in `AppContext`), it's implemented in a separate `"use client"` component (`AddToCartButton.tsx` in the example) and passed the product data as a prop. The main page component fetches the data and renders the static product details, delegating the interactive parts to the client component. Error handling for product not found is included.

### 4.3 Cart Page (`src/app/cart/page.tsx`)

*   **Description:** The page displaying the contents of the shopping cart.
*   **Purpose:** Provides a dedicated view for users to review the items they have added to their cart, adjust quantities, remove items, and proceed to the checkout process.
*   **Key Features/Logic:**
    *   A Client Component (`"use client"`) because it relies heavily on the interactive cart state managed in the `AppContext` and user interactions for updating/removing items.
    *   Renders the `CartClient` component, which contains the core logic and UI for displaying cart items and the summary.
    *   This page acts as a simple wrapper for the `CartClient`.
*   **Interfaces/Props:** None. Includes the `CartClient` component.
*   **Dependencies:** Imports `CartClient`.
*   **Code Snippet (Structure):**

```
tsx
// src/app/cart/page.tsx
"use client"; // Client component as it renders a client component that uses context

import CartClient from '@/components/cart/CartClient'; // Main cart client component

export default function CartPage() {
  // This page is a simple container for the CartClient component.
  // All the logic and state access for the cart are within CartClient.
  return (
    <CartClient /> // Render the CartClient component
  );
}
```

*   **Explanation:** This page is straightforward; its primary role is to serve as the entry point for the `/cart` route and render the `CartClient` component. It must be a client component because `CartClient` uses the `useAppContext` hook and handles client-side interactivity.

### 4.4 Checkout Page (`src/app/checkout/page.tsx`)

*   **Description:** The checkout page (currently incomplete).
*   **Purpose:** Intended to handle the final steps of the purchasing process, including collecting shipping information, selecting payment methods, and processing the order. Currently serves as a placeholder.
*   **Key Features/Logic:**
    *   Placeholder content indicating that the checkout feature is not yet implemented.
    *   In a real implementation, this would involve:
        *   Fetching cart details (likely from the server or `AppContext`).
        *   Forms for shipping address, billing address.
        *   Payment method selection (e.g., credit card form, integration with Stripe or PayPal).
        *   Calculating final total including shipping and tax.
        *   Order confirmation and processing.
        *   This would likely involve significant client-side state management for form data and interaction with a backend API for payment processing and order creation.
*   **Interfaces/Props:** None.
*   **Dependencies:** Currently minimal, likely only basic UI components. Future implementation would require payment gateway libraries, form handling libraries, and potentially backend API clients.
*   **Code Snippet (Structure):**

```
tsx
// src/app/checkout/page.tsx
// Can be a Server Component initially, but payment processing will require client-side logic

export default function CheckoutPage() {
  return (
    // Container for the checkout page
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Placeholder content for the incomplete checkout */}
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Checkout is not yet implemented.
        </p>
        <p className="text-muted-foreground">
          This page will handle shipping, payment, and order confirmation.
        </p>
        {/* Optionally add a link back to the cart */}
         {/* <Link href="/cart">Return to Cart</Link> */}
      </div>

      {/* In a real implementation, you would add forms, payment elements, etc. here */}
       {/* <CheckoutForm />
        <PaymentMethodSelection />
        <OrderSummary />
        <PlaceOrderButton />
       */}
    </div>
  );
}
```
*   **Explanation:** As a placeholder, the checkout page is very simple. Its structure indicates where the complex checkout logic and UI would eventually reside. Implementing a functional checkout would involve integrating with a payment gateway (like Stripe), handling user input for addresses and payment details securely, and interacting with a backend to create and process orders. This would likely require a mix of server and client components for data fetching, form handling, and secure payment element rendering.

### 4.5 Admin Page (`src/app/admin/page.tsx`)

*   **Description:** A placeholder page for administrative functions.
*   **Purpose:** Intended to provide an interface for managing the product catalog, viewing orders, or other administrative tasks. Currently serves as a placeholder.
*   **Key Features/Logic:**
    *   Placeholder content indicating that the admin feature is not yet implemented.
    *   In a real implementation, this would require:
        *   Authentication and authorization to restrict access.
        *   Interfaces for adding, editing, and deleting products.
        *   Views for managing orders, customers, etc.
        *   This would involve significant interaction with a backend API.
*   **Interfaces/Props:** None.
*   **Dependencies:** Currently minimal. Future implementation would require authentication libraries and backend API clients.
*   **Code Snippet (Structure):**

```
tsx
// src/app/admin/page.tsx
// Can be a Server Component initially, but content management will require client-side logic

export default function AdminPage() {
  return (
    // Container for the admin page
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Placeholder content for the incomplete admin page */}
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-xl text-muted-foreground mb-4">
          Admin functionality is not yet implemented.
        </p>
        <p className="text-muted-foreground">
          This page will provide tools for managing products, orders, etc.
        </p>
         {/* Potentially a login form or message if not authenticated */}
         {/* <AdminLoginForm /> */}
      </div>

       {/* In a real implementation, you would add admin dashboards, forms, tables, etc. here */}
        {/* <ProductManagementTable />
         <OrderListing />
         <UserManagement />
        */}
    </div>
  );
}
```
*   **Explanation:** Similar to the checkout page, the admin page is a placeholder. A real admin interface would be a complex part of the application, requiring robust authentication, data fetching, and potentially server actions or API routes for performing administrative operations.

## 5. AI Integration (`src/ai`)

This directory contains code specifically related to the AI recommendation feature using GenKit.

#### `src/ai/flows/recommend-scents.ts`

*   **Description:** Defines the GenKit flow for recommending aromatherapy scents based on user quiz answers.
*   **Purpose:** This server-side code interacts with a large language model (via GenKit) to process user preferences (mood, desired effect, scent profile) collected from the quiz and generate a list of recommended product names and a reasoning explanation.
*   **Key Features/Logic:**
    *   Uses the `'use server'` directive to ensure it runs only on the server side.
    *   Defines a GenKit `flow` named `recommendScents`.
    *   Specifies the input schema for the flow using Zod (`RecommendScentsInputSchema`), expecting `mood`, `desiredEffect`, and `scentProfile` strings.
    *   Specifies the output schema using Zod (`RecommendScentsOutputSchema`), expecting an array of `productRecommendations` (strings) and a `reasoning` string.
    *   Includes a `generate` step within the flow that uses a large language model (`lm`) to process a structured prompt.
    *   The prompt interpolates the user's quiz answers into a predefined text requesting product names and reasoning. It explicitly asks for product names from the mock list (`MOCK_PRODUCTS`) for easier matching, which is a current limitation/hack.
    *   The LLM output is parsed according to the output schema.
    *   The flow returns the parsed AI response.
*   **Interfaces/Props:**
    *   Defines TypeScript types (`RecommendScentsInput`, `RecommendScentsOutput`) corresponding to the Zod schemas.
*   **Dependencies:** Imports GenKit components (`defineFlow`, `generate`), Zod for schema validation (`z`), and potentially the language model instance (`lm`) configured elsewhere (e.g., in `genkit.dev.ts`). Imports constants like `MOCK_PRODUCTS` for the prompt.
*   **Code Snippet (Structure):**

```
typescript
// src/ai/flows/recommend-scents.ts
"use server"; // Ensure this code runs only on the server

import { defineFlow, generate } from '@genkit-ai/flow'; // GenKit flow definition
import { z } from 'zod'; // Zod for schema validation
// Assuming your language model instance is configured and available, e.g., from a central config
import { geminiPro } from '@genkit-ai/google-genai'; // Example: Import Gemini model

import { MOCK_PRODUCTS } from '@/lib/constants'; // Import mock products for the prompt

// --- Zod Schemas for Input and Output ---

// Schema for the input expected by the AI flow (from quiz answers)
export const RecommendScentsInputSchema = z.object({
  mood: z.string().describe('The user\'s current mood or desired feeling.'),
  desiredEffect: z.string().describe('The therapeutic effect the user is looking for (e.g., relaxation, energy, focus).'),
  scentProfile: z.string().describe('The user\'s preferred scent profile (e.g., floral, woody, citrus, spicy).'),
});

// TypeScript type derived from the input schema
export type RecommendScentsInput = z.infer<typeof RecommendScentsInputSchema>;

// Schema for the output expected from the AI model
export const RecommendScentsOutputSchema = z.object({
  productRecommendations: z.array(z.string()).describe('An array of recommended product names.'),
  reasoning: z.string().describe('A brief explanation of why these products were recommended based on the user\'s preferences.'),
});

// TypeScript type derived from the output schema
export type RecommendScentsOutput = z.infer<typeof RecommendScentsOutputSchema>;

// --- GenKit Flow Definition ---

// Define the GenKit flow for recommending scents
export const recommendScents = defineFlow(
  {
    name: 'recommendScents', // Unique name for the flow
    inputSchema: RecommendScentsInputSchema, // Link the input schema
    outputSchema: RecommendScentsOutputSchema, // Link the output schema
  },
  async (input) => { // The main logic of the flow
    // Use the LLM to generate recommendations
    const result = await generate({
      model: geminiPro, // Specify the language model to use
      prompt: `
        The user is looking for aromatherapy scents based on their preferences from a quiz.
        Their preferences are:
        - Mood: ${input.mood}
        - Desired Effect: ${input.desiredEffect}
        - Scent Profile: ${input.scentProfile}

        Based on these preferences, recommend a list of aromatherapy products from the following list of available products.
        Only recommend products that are relevant to the user's preferences.
        If a product isn't a perfect match, explain why it's a good suggestion.
        Also, provide a brief reasoning for your overall recommendations.

        Available Products:
        ${MOCK_PRODUCTS.map(p => `- ${p.name} (${p.scentFamily}, ${p.category})`).join('\n')}

        Provide the output as a JSON object with two keys: "productRecommendations" (an array of strings with the names of the recommended products from the list above) and "reasoning" (a string explaining the recommendations).
      `, // The prompt provided to the LLM
      config: {
        // Optional: Model configuration (e.g., temperature)
        temperature: 0.5,
      },
    });

    // The result object is automatically parsed by GenKit based on the output schema.
    // Access the parsed output from the `output()` method.
    const aiOutput = result.output();

    // Return the AI's output, which matches the output schema
    return aiOutput;
  }
);

// This flow function is automatically available for calling from other server-side code
// due to the "use server" directive. For client-side calls, you'd typically
// wrap this in a Next.js Server Action if not using the default GenKit API route.
// The example implementation in AppContext uses the default Server Action mechanism.
```

*   **Explanation:** This file defines the core AI logic. It uses GenKit's `defineFlow` to structure the AI interaction. The `generate` step sends a carefully crafted prompt to the configured language model, incorporating the user's quiz answers. The prompt is designed to instruct the LLM to recommend products from the provided mock list and provide reasoning. Zod schemas are crucial for validating both the input received from the client (via the quiz answers) and the output generated by the LLM, ensuring data integrity. The `'use server'` directive makes this flow callable from other server-side code, including potentially from Server Actions triggered by client components (though the `AppContext` implementation directly calls this function, relying on Next.js's handling of server functions). A notable limitation is the reliance on the LLM to pick from the hardcoded `MOCK_PRODUCTS` list provided in the prompt; a more robust solution would involve the AI outputting characteristics (like scent families or effects) which are then used to query a product database.

## 6. Utilities and Types (`src/lib`)

This directory contains shared code that doesn't belong to specific components or routes.

#### `src/lib/constants.ts`

*   **Description:** Contains various constant values used throughout the application.
*   **Purpose:** Centralizes hardcoded data and configuration values, making them easy to manage and update.
*   **Key Features/Logic:**
    *   Exports constants for:
        *   `MOCK_PRODUCTS`: An array of objects representing the product catalog (currently hardcoded).
        *   `CATEGORIES`: An array of available product categories.
        *   `SCENT_FAMILIES`: An array of scent family options.
        *   `SORT_OPTIONS`: An array of objects defining product sorting options (value and label).
        *   `MAX_PRICE`: The maximum value used for the price range slider.
        *   `INITIAL_PRODUCT_STATE`: The default state for product filtering and sorting.
        *   `INITIAL_CART_STATE`: The default state for the shopping cart.
        *   `QUIZ_QUESTIONS`: An array of objects defining the questions for the AI quiz, including their keys, questions, and potential options.
*   **Interfaces/Props:** Exports various arrays and objects.
*   **Dependencies:** None, other than potentially relying on types defined in `types.ts`.
*   **Code Snippet (Example Structure):**

```
typescript
// src/lib/constants.ts

import type { Product, ProductState, CartState, QuizQuestion, SortOption } from './types'; // Import relevant types

// --- Mock Product Data ---
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lavender Relaxation Oil',
    description: 'Pure lavender essential oil for calming and relaxation.',
    price: 12.99,
    image: '/images/lavender_oil.png', // Placeholder image path
    category: 'Essential Oils',
    scentFamily: 'Floral',
    // Add more product details as needed
  },
  {
    id: '2',
    name: 'Eucalyptus Energy Diffuser',
    description: 'Invigorating eucalyptus blend for focus and clear breathing.',
    price: 24.50,
    image: '/images/eucalyptus_diffuser.png', // Placeholder image path
    category: 'Diffusers',
    scentFamily: 'Herbal',
    // ... more products ...
  },
  {
    id: '3',
    name: 'Citrus Sunshine Candle',
    description: 'Uplifting citrus blend to brighten your mood.',
    price: 18.00,
    image: '/images/citrus_candle.png', // Placeholder image path
    category: 'Candles',
    scentFamily: 'Citrus',
    // ... more products ...
  },
   {
    id: '4',
    name: 'Sandalwood Meditation Blend',
    description: 'Warm, woody scent for grounding and meditation.',
    price: 29.99,
    image: '/images/sandalwood_blend.png',
    category: 'Essential Oil Blends',
    scentFamily: 'Woody',
  },
  {
    id: '5',
    name: 'Peppermint Focus Rollerball',
    description: 'Cooling peppermint for concentration and alertness.',
    price: 9.50,
    image: '/images/peppermint_roller.png',
    category: 'Rollerballs',
    scentFamily: 'Minty',
  },
   {
    id: '6',
    name: 'Chamomile Comfort Balm',
    description: 'Soothing chamomile for relaxation and sleep.',
    price: 15.75,
    image: '/images/chamomile_balm.png',
    category: 'Balms',
    scentFamily: 'Floral',
  },
    {
    id: '7',
    name: 'Pine Forest Diffuser Refill',
    description: 'Earthy pine scent for a refreshing outdoor feel.',
    price: 19.00,
    image: '/images/pine_refill.png',
    category: 'Diffuser Refills',
    scentFamily: 'Woody',
  },
    {
    id: '8',
    name: 'Ginger Spice Massage Oil',
    description: 'Warming ginger and spice blend for soothing muscles.',
    price: 21.00,
    image: '/images/ginger_oil.png',
    category: 'Massage Oils',
    scentFamily: 'Spicy',
  },
     {
    id: '9',
    name: 'Rose Garden Room Spray',
    description: 'Classic rose scent to freshen any room.',
    price: 16.50,
    image: '/images/rose_spray.png',
    category: 'Room Sprays',
    scentFamily: 'Floral',
  },
      {
    id: '10',
    name: 'Tea Tree Purifying Oil',
    description: 'Antiseptic tea tree oil for cleansing and purifying.',
    price: 11.00,
    image: '/images/tea_tree_oil.png',
    category: 'Essential Oils',
    scentFamily: 'Herbal',
  },
];

// --- Product Filtering and Sorting Options ---
export const CATEGORIES = [
  'Essential Oils',
  'Diffusers',
  'Candles',
  'Rollerballs',
  'Balms',
  'Massage Oils',
  'Room Sprays',
  'Essential Oil Blends',
  'Diffuser Refills'
]; // Example categories

export const SCENT_FAMILIES = [
  'Floral',
  'Woody',
  'Citrus',
  'Herbal',
  'Spicy',
  'Minty'
]; // Example scent families

export const SORT_OPTIONS: SortOption[] = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  // Add other sorting options as needed
];

export const MAX_PRICE = 30; // Maximum price for the slider (based on mock data)

// --- Initial State for Context Reducers ---
export const INITIAL_PRODUCT_STATE: ProductState = {
  category: 'all', // 'all' means no category filter
  sortBy: 'name-asc', // Default sort
  filters: {
    price: [0, MAX_PRICE], // Default price range
    // scentFamilies: {} // Example structure for scent family filters
  },
};

export const INITIAL_CART_STATE: CartState = {
  items: [], // Empty array initially
  isOpen: false, // Cart sidebar is closed initially
};

// --- AI Quiz Questions ---
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    key: 'mood', // Key to store the answer in quizAnswers state
    question: 'How are you feeling today, or how would you like to feel?',
    options: [
      { label: 'Stressed / Anxious', value: 'stressed_anxious' },
      { label: 'Tired / Low Energy', value: 'tired_low_energy' },
      { label: 'Unfocused / Distracted', value: 'unfocused_distracted' },
      { label: 'Happy / Content', value: 'happy_content' },
      { label: 'Sad / Down', value: 'sad_down' },
      { label: 'Restless / Can\'t Sleep', value: 'restless_sleepless' },
    ],
    type: 'radio', // Indicate the type of input (for future flexibility)
  },
   {
    key: 'desiredEffect', // Key for desired therapeutic effect
    question: 'What therapeutic effect are you looking for?',
    options: [
      { label: 'Relaxation / Calm', value: 'relaxation_calm' },
      { label: 'Energy / Uplifting', value: 'energy_uplifting' },
      { label: 'Focus / Concentration', value: 'focus_concentration' },
      { label: 'Sleep Aid', value: 'sleep_aid' },
      { label: 'Mood Boost', value: 'mood_boost' },
      { label: 'Stress Relief', value: 'stress_relief' },
       { label: 'Air Purification', value: 'air_purification' },
    ],
    type: 'radio',
  },
  {
    key: 'scentProfile', // Key for preferred scent profile
    question: 'What kind of scents do you usually prefer?',
    options: [
      { label: 'Floral (e.g., Lavender, Rose, Chamomile)', value: 'Floral' },
      { label: 'Woody / Earthy (e.g., Sandalwood, Pine)', value: 'Woody' },
      { label: 'Citrus / Fruity (e.g., Orange, Lemon, Grapefruit)', value: 'Citrus' },
      { label: 'Herbal / Green (e.g., Eucalyptus, Tea Tree, Rosemary)', value: 'Herbal' },
      { label: 'Spicy / Warm (e.g., Ginger, Cinnamon)', value: 'Spicy' },
      { label: 'Minty / Camphoraceous (e.g., Peppermint)', value: 'Minty' },
      { label: 'I like a mix', value: 'Mix' },
    ],
     type: 'radio',
  },
  // Add more questions as needed for a more nuanced recommendation
  // Example: How do you plan to use the product? (Diffuser, Topical, Bath, etc.)
];
```

*   **Explanation:** This file is a straightforward collection of JavaScript constants. It's crucial for maintaining consistency across the application and simplifies updates to product data, filtering options, or quiz questions. By centralizing these values, it avoids scattering magic strings or hardcoded data throughout the codebase. The mock data and quiz questions are the primary drivers of the application's current content.

#### `src/lib/types.ts`

*   **Description:** Contains TypeScript type definitions used across the application.
*   **Purpose:** Provides static type checking for data structures and application state, improving code reliability and maintainability.
*   **Key Features/Logic:**
    *   Exports type definitions for:
        *   `Product`: Defines the structure of a product object.
        *   `CartItem`: Defines the structure of an item in the shopping cart (includes product details and quantity).
        *   `ProductState`: Defines the structure of the product filtering and sorting state.
        *   `CartState`: Defines the structure of the shopping cart state.
        *   `QuizQuestion`: Defines the structure of a question in the AI quiz.
        *   `SortOption`: Defines the structure of a sorting option.
        *   `AppAction`: Defines a union type for all possible actions that can be dispatched to the `AppContext` reducer, including actions for product state, cart state, and quiz state. This is essential for type-safe dispatching and reducer implementation.
        *   `AppState`: Defines the overall structure of the global application state managed by `AppContext`.
*   **Interfaces/Props:** Exports various type and interface definitions.
*   **Dependencies:** None.
*   **Code Snippet (Structure):**

```
typescript
// src/lib/types.ts

// --- Product Types ---
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Path to the product image
  category: string;
  scentFamily: string;
  // Add any other relevant product properties here
}

// --- Cart Types ---
// CartItem extends Product but adds a quantity field
export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean; // Whether the cart sidebar/modal is open
}

// --- Product Filtering & Sorting Types ---
export interface ProductFilters {
  price?:
```the state and dispatch for filtering and sorting.
    *   Renders the `ProductFilters` component.
    *   Renders the `ProductGrid` component.
    *   Effectively acts as an orchestrator, placing the filter controls and the product display area together on the same page.
*   **Interfaces/Props:** None. Relies on `useAppContext`.
*   **Dependencies:** Imports `useAppContext`, `ProductFilters`, and `ProductGrid`.
*   **Code Snippet (Example Structure):**

```
tsx
typescript // src/app/products/page.tsx "use client"; // Client component to interact with context

import { useAppContext } from '@/contexts/AppContext'; // App state context import ProductFilters from '@/components/products/ProductFilters'; // Component for filter controls import ProductGrid from '@/components/products/ProductGrid'; // Component for displaying products

export default function ProductsPage() { // Access the context (optional for this specific page if filters/grid manage state directly, but good practice) // const { products, productState, dispatch } = useAppContext();

return ( // Container for the products page layout <div className="container mx-auto py-8 px-4 md:px-6"> {/* Page Title */} <h1 className="text-3xl font-bold mb-8 text-center">Our Aromatherapy Collection</h1>

        {/* Layout for filters and product grid */}
        <div className="flex flex-col lg:flex-row gap-8"> {/* Stack filters and grid vertically on small screens, side-by-side on large */}

            {/* Filters Section */}
            <aside className="lg:w-1/4"> {/* Sidebar for filters on large screens */}
                <ProductFilters /> {/* Render the ProductFilters component */}
            </aside>

            {/* Product Grid Section */}
            <main className="lg:w-3/4"> {/* Main area for the product grid */}
                <ProductGrid /> {/* Render the ProductGrid component */}
            </main>
        </div>

    </div>


); }
```

*   **Explanation:** The `ProductsPage` is a relatively simple component that combines the `ProductFilters` and `ProductGrid`. By making it a client component, it ensures that interactions with the filters (which update the `AppContext` state) correctly trigger re-renders in the `ProductGrid`. The layout uses flexbox with responsive classes to arrange the filters and the grid side-by-side on larger screens and stacked on smaller ones, providing a standard e-commerce browsing experience.

#### `src/app/products/[productId]/page.tsx`

*   **Description:** The individual product detail page.
*   **Purpose:** Displays comprehensive information about a single product, identified by its unique `productId` in the URL. It allows the user to view details like description, scent notes, usage instructions, and add the specific product to the cart.
*   **Key Features/Logic:**
    *   A Server Component (default for App Router pages with dynamic segments). This is efficient as product data is typically static for a given ID and can be fetched on the server for initial render and SEO.
    *   Uses the dynamic route segment `params.productId` to identify which product to display.
    *   Fetches the specific product data based on the `productId` from `MOCK_PRODUCTS` (or a backend API in a real application).
    *   Handles the case where a product with the given ID is not found (e.g., displays a 404 message).
    *   Displays detailed product information: name, description, price, image, etc.
    *   Includes an "Add to Cart" button. This button must be in a Client Component to interact with `useAppContext`. Therefore, the page likely imports a client component (e.g., `AddToCartButton` or passes product data to a client-side wrapper component) that handles the dispatching of the `ADD_ITEM` action.
    *   Uses `notFound()` from `next/navigation` to render the closest `not-found.tsx` if the product is not found.
    *   Utilizes Shadcn UI components for layout and presentation.
*   **Interfaces/Props:** Receives `params` with a `productId` property from the dynamic route.
*   **Dependencies:** Imports `notFound` from `next/navigation`, `Image` from `next/image`, constants (`MOCK_PRODUCTS`), and potentially a Client Component for the "Add to Cart" functionality. Uses Shadcn UI components (`Button`, `Separator`).
*   **Code Snippet (Example Structure):**

```
tsx
typescript // src/app/products/[productId]/page.tsx // This is a Server Component by default

import { notFound } from 'next/navigation'; // For handling product not found import Image from 'next/image'; // For displaying product image import { MOCK_PRODUCTS } from '@/lib/constants'; // Source of product data import { Button } from '@/components/ui/button'; // Example button // import AddToCartButton from '@/components/cart/AddToCartButton'; // A Client Component for add to cart import { Separator } from '@/components/ui/separator'; // Separator component

interface ProductDetailPageProps { params: { productId: string; // The product ID from the URL }; }

export default function ProductDetailPage({ params }: ProductDetailPageProps) { // Find the product based on the productId from the URL params const product = MOCK_PRODUCTS.find(p => p.id === params.productId);

// If product is not found, render the not-found page if (!product) { notFound(); }

return ( // Main container for the product detail page <div className="container mx-auto py-8 px-4 md:px-6"> {/ Flex layout for image and details on larger screens */} <div className="flex flex-col lg:flex-row gap-8"> {/* Image section */} <div className="lg:w-1/2 relative h-96 md:h-[500px] overflow-hidden rounded-lg"> <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" priority // Prioritize loading the main product image /> </div>

        {/* Details section */}
        <div className="lg:w-1/2 space-y-6"> {/* Spacing between detail elements */}
          <h1 className="text-4xl font-bold">{product.name}</h1> {/* Product Name */}
          <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p> {/* Product Price */}

          <Separator /> {/* Visual separator */}

          {/* Product Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Scent Family/Notes (Example) */}
          {/* <div>
             <h2 className="text-xl font-semibold mb-2">Scent Profile</h2>
             <p className="text-muted-foreground">Scent Family: {product.scentFamily}</p>
             // Add more details like top/middle/base notes if available
          </div> */}

          {/* Usage Instructions (Example) */}
          {/* <div>
             <h2 className="text-xl font-semibold mb-2">How to Use</h2>
             <ul className="list-disc list-inside text-muted-foreground space-y-1">
                 <li>Apply a few drops to a diffuser.</li>
                 <li>Add to a carrier oil for massage.</li>
                 // ... other instructions
             </ul>
          </div> */}

          <Separator /> {/* Visual separator */}

          {/* Add to Cart Button (Needs to be in a Client Component) */}
          {/* You would pass the product data to a client component here */}
          {/* <AddToCartButton product={product} /> */}
           {/* Placeholder Button - replace with actual add to cart logic */}
           <Button size="lg" className="w-full">Add to Cart</Button>

        </div>
      </div>

    </div>


); }
```

*   **Explanation:** The `ProductDetailPage` leverages Server Components to fetch product data efficiently using the dynamic `productId` from the URL. It finds the corresponding product in `MOCK_PRODUCTS` and uses `notFound()` if the ID doesn't match any product. The page displays the product's image and detailed information. Since interacting with the cart requires client-side logic (`useAppContext`), the "Add to Cart" button functionality needs to be encapsulated within a separate Client Component (e.g., `AddToCartButton`) that receives the product data as props and handles the dispatching of the `ADD_ITEM` action.

### 4.3 Cart Page (`src/app/cart/page.tsx`)

#### `src/app/cart/page.tsx`

*   **Description:** The shopping cart page.
*   **Purpose:** Displays the list of items currently in the user's shopping cart, allowing them to review items, adjust quantities, remove items, and proceed to checkout (although checkout is not implemented in this project).
*   **Key Features/Logic:**
    *   A Client Component (`"use client"`) as it needs to interact with the `cart` state managed in the `AppContext`.
    *   Uses `useAppContext` to access the `cart` array and the `dispatch` function.
    *   Iterates over the items in the `cart` array to display each item.
    *   For each item, it shows the product name, image, price, quantity, and potentially the subtotal for that item.
    *   Provides controls (buttons) to adjust the quantity of each item (dispatching `UPDATE_QUANTITY`) and to remove an item entirely (dispatching `REMOVE_ITEM`).
    *   Calculates and displays the total price of all items in the cart.
    *   Displays a message if the cart is empty.
    *   Includes a placeholder "Proceed to Checkout" button.
    *   Utilizes Shadcn UI components for layout and presentation.
*   **Interfaces/Props:** None. Relies on `useAppContext`.
*   **Dependencies:** Imports `useAppContext`, `Image` from `next/image`, components from Shadcn UI (`Button`, `Separator`, `Table`, `TableBody`, `TableCell`, `TableFooter`, `TableHead`, `TableHeader`, `TableRow`), and potentially icons (`Trash2`). Imports type definitions (`CartItem`).
*   **Code Snippet (Example Structure):**

```
tsx
typescript // src/app/cart/page.tsx "use client"; // Client component to interact with cart state

import { useAppContext } from '@/contexts/AppContext'; // App state context import Image from 'next/image'; // For displaying product images in the cart import { Button } from '@/components/ui/button'; // Button component import { Separator } from '@/components/ui/separator'; // Separator component // Table components from Shadcn UI for displaying cart items import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'; import { Trash2 } from 'lucide-react'; // Icon for removing items import type { CartItem } from '@/lib/types'; // Import CartItem type

export default function CartPage() { // Access cart state and dispatch from context const { cart, dispatch } = useAppContext();

// Handler to update item quantity const handleUpdateQuantity = (itemId: string, newQuantity: number) => { // Ensure quantity is at least 1 if (newQuantity < 1) newQuantity = 1; dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity: newQuantity } }); };

// Handler to remove an item const handleRemoveItem = (itemId: string) => { dispatch({ type: 'REMOVE_ITEM', payload: itemId }); };

// Calculate the total price of items in the cart const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const isCartEmpty = cart.length === 0; // Check if the cart is empty

return ( // Main container for the cart page <div className="container mx-auto py-8 px-4 md:px-6"> <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

  {isCartEmpty ? (
    // Display message if cart is empty
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <p className="text-xl font-medium">Your cart is empty.</p>
      {/* Optional: Button to go shopping */}
      {/* <Button className="mt-4">Start Shopping</Button> */}
    </div>
  ) : (
    // Display cart contents if not empty
    <div className="space-y-8"> {/* Spacing */}

      {/* Cart Items Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead> {/* Hide image column on very small screens */}
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right hidden sm:table-cell">Price</TableHead> {/* Hide price column on very small screens */}
            <TableHead className="text-right">Subtotal</TableHead>
            <TableHead className="text-right">Remove</TableHead> {/* Column for remove button */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item) => ( {/* Map over cart items */}
            <TableRow key={item.id}>
              {/* Product Image */}
              <TableCell className="hidden sm:table-cell">
                 <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" />
              </TableCell>
              {/* Product Name */}
              <TableCell className="font-medium">{item.name}</TableCell>
              {/* Quantity Control */}
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {/* Decrease Quantity Button */}
                  <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
                  {/* Display Quantity */}
                  <span>{item.quantity}</span>
                  {/* Increase Quantity Button */}
                  <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                </div>
              </TableCell>
              {/* Item Price */}
              <TableCell className="text-right hidden sm:table-cell">${item.price.toFixed(2)}</TableCell>
              {/* Item Subtotal */}
              <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
              {/* Remove Item Button */}
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                   <Trash2 className="w-4 h-4 text-red-500" /> {/* Trash icon */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* Total Row */}
          <TableRow>
            <TableCell colSpan={4} className="text-right text-lg font-bold">Total:</TableCell> {/* Spans columns for total label */}
            <TableCell className="text-right text-lg font-bold">${total.toFixed(2)}</TableCell> {/* Displays total price */}
            <TableCell></TableCell> {/* Empty cell for alignment */}
          </TableRow>
        </TableFooter>
      </Table>

      <Separator className="my-8" /> {/* Separator before checkout button */}

      {/* Checkout Button */}
      <div className="flex justify-end">
        <Button size="lg" disabled>Proceed to Checkout (Not Implemented)</Button> {/* Placeholder checkout button */}
      </div>
    </div>
  )}

</div>


); }
```

*   **Explanation:** The `CartPage` is a crucial Client Component for user interaction with their selected items. It accesses the `cart` state from the `AppContext` and renders its contents, typically in a table format using Shadcn UI components. It provides buttons to modify the quantity of each item or remove items entirely, dispatching the appropriate actions (`UPDATE_QUANTITY`, `REMOVE_ITEM`) to update the global state. The page calculates and displays the total cart value. A "Proceed to Checkout" button is included as a placeholder for future implementation.

## 5. Contexts (`src/contexts`)

This directory contains the React Context responsible for managing the global state of the application.

### 5.1 `src/contexts/AppContext.tsx`

*   **Description:** Defines and provides the main application-wide state context.
*   **Purpose:** Centralizes shared state, including product data, filtering/sorting criteria, cart items, and quiz state. It uses React's `useReducer` to manage state updates based on dispatched actions, and provides this state and a dispatch function to any component that consumes the context.
*   **Key Features/Logic:**
    *   Defines the shape of the global `AppState` (including `products`, `productState`, `cart`, `quizActive`, `quizStep`, `quizAnswers`, `quizResults`, `isLoadingQuizResults`).
    *   Defines the shape of possible `AppAction` types (e.g., `SET_PRODUCTS`, `SET_CATEGORY`, `SET_SORT`, `SET_FILTER`, `RESET_FILTERS`, `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `START_QUIZ`, `NEXT_STEP`, `SUBMIT_QUIZ_START`, `SUBMIT_QUIZ_SUCCESS`, `SUBMIT_QUIZ_ERROR`, `RESET_QUIZ`).
    *   Implements the `appReducer` function, which takes the current `state` and a dispatched `action`, and returns the new state based on the action type and payload. This reducer contains the core logic for updating state, including filtering/sorting products (though basic filtering is shown, full logic is in `ProductGrid` for now), managing cart items (adding, removing, updating quantity), and managing the quiz state and results.
    *   Creates the `AppContext` using `React.createContext`.
    *   Provides the `AppContextProvider` component, which wraps the application's components. This provider initializes the state (e.g., loading `MOCK_PRODUCTS`) and uses `useReducer` to manage state updates. It passes the current `state` and the `dispatch` function down to its children via the `AppContext.Provider`.
    *   Includes a `useAppContext` custom hook for easy consumption of the context by child components, ensuring the hook is used within the provider.
    *   Includes a combined dispatch function (`combinedDispatch`) which is used by components like `ProductFilters`. This combined dispatch can be extended to handle side effects or dispatch multiple actions if needed, but in this basic setup, it primarily logs the action and then calls the main `dispatch`.
    *   Simulates the AI quiz backend interaction within the reducer for demo purposes (using `setTimeout`). In a real application, this would involve an asynchronous API call.
*   **Interfaces/Props:**
    *   `AppState`: Interface defining the shape of the global state.
    *   `AppAction`: Type defining the possible actions that can be dispatched.
    *   `AppContextType`: Interface defining the shape of the context value (state and dispatch).
    *   `AppContextProviderProps`: Interface for the provider component props (primarily `children`).
*   **Dependencies:** Imports `React`, `createContext`, `useReducer`, `useContext`, `useEffect` from `react`. Imports constants (`MOCK_PRODUCTS`, `QUIZ_QUESTIONS`) and types (`Product`, `CartItem`, `QuizAnswers`).
*   **Code Snippet:**

```
tsx
typescript // src/contexts/AppContext.tsx "use client"; // Client component to use React hooks

import React, { createContext, useReducer, useContext, useEffect } from 'react'; // Import React hooks import { MOCK_PRODUCTS, QUIZ_QUESTIONS } from '@/lib/constants'; // Import mock data and quiz questions import type { Product, CartItem, QuizAnswers } from '@/lib/types'; // Import type definitions

// --- State and Action Definitions ---

// Define the shape of the global state
interface AppState { products: Product[]; // Array of all products productState: { // State related to product listing (filtering, sorting) category: string; // Current category filter ('all', 'oils', 'diffusers', etc.) sortBy: string; // Current sort order ('price-asc', 'name-desc', etc.) filters: { // Other potential filters (e.g., price range, scent family) price: [number, number] | null; // Price range filter: [min, max] }; }; cart: CartItem[]; // Array of items in the shopping cart quizActive: boolean; // Is the quiz currently active? quizStep: number; // Current step/question number in the quiz quizAnswers: QuizAnswers; // Object storing user's answers to quiz questions quizResults: Product[]; // Array of recommended products from the quiz isLoadingQuizResults: boolean; // Is the AI quiz recommendation currently loading? }

// Define the types of actions that can be dispatched
type AppAction = | { type: 'SET_PRODUCTS'; payload: Product[]; } // Action to set the list of products | { type: 'SET_CATEGORY'; payload: string; } // Action to set the product category filter | { type: 'SET_SORT'; payload: string; } // Action to set the product sort order | { type: 'SET_FILTER'; payload: { filterName: keyof AppState['productState']['filters']; value: AppState['productState']['filters'][keyof AppState['productState']['filters']]; }; } // Action to set a generic filter (e.g., price) | { type: 'RESET_FILTERS'; } // Action to reset all product filters and sorting | { type: 'ADD_ITEM'; payload: Product; } // Action to add a product to the cart | { type: 'REMOVE_ITEM'; payload: string; } // Action to remove an item from the cart by product ID | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number; }; } // Action to update the quantity of a cart item | { type: 'START_QUIZ'; } // Action to start the quiz | { type: 'NEXT_STEP'; payload: Partial<QuizAnswers>; } // Action to move to the next quiz step and save answer | { type: 'SUBMIT_QUIZ_START'; } // Action to indicate quiz submission and start loading | { type: 'SUBMIT_QUIZ_SUCCESS'; payload: Product[]; } // Action when AI quiz results are received successfully | { type: 'SUBMIT_QUIZ_ERROR'; payload: string; } // Action when an error occurs during quiz submission | { type: 'RESET_QUIZ'; } // Action to reset the quiz state

// --- Initial State ---

// Define the initial state of the application
const initialState: AppState = { products: [], // Initially empty, will be loaded cart: [], productState: { category: 'all', // Default category sortBy: 'name-asc', // Default sort filters: { price: null, // Default price filter is null }, }, quizActive: false, quizStep: 0, quizAnswers: {}, quizResults: [], isLoadingQuizResults: false, };

// --- Reducer Function ---

// The reducer function handles state transitions based on actions
const appReducer = (state: AppState, action: AppAction): AppState => { switch (action.type) { case 'SET_PRODUCTS': // Action to set the initial list of products return { ...state, products: action.payload };

    case 'SET_CATEGORY': // Action to update the category filter
      return {
        ...state,
        productState: {
          ...state.productState,
          category: action.payload,
        },
      };

    case 'SET_SORT': // Action to update the sort order
      return {
        ...state,
        productState: {
          ...state.productState,
          sortBy: action.payload,
        },
      };

    case 'SET_FILTER': // Action to set a specific filter (e.g., price range)
      return {
        ...state,
        productState: {
          ...state.productState,
          filters: {
            ...state.productState.filters,
            [action.payload.filterName]: action.payload.value,
          },
        },
      };

    case 'RESET_FILTERS': // Action to reset filters and sorting to default
      return {
        ...state,
        productState: {
          category: 'all',
          sortBy: 'name-asc',
          filters: { price: null },
        },
      };

    case 'ADD_ITEM': { // Action to add a product to the cart
      const productToAdd = action.payload;
      // Check if the item already exists in the cart
      const existingItemIndex = state.cart.findIndex(item => item.id === productToAdd.id);

      let newCart;
      if (existingItemIndex > -1) {
        // If item exists, increase its quantity
        newCart = [...state.cart];
        newCart[existingItemIndex].quantity += 1;
      } else {
        // If item is new, add it to the cart with quantity 1
        newCart = [...state.cart, { ...productToAdd, quantity: 1 }];
      }
      return { ...state, cart: newCart };
    }

    case 'REMOVE_ITEM': // Action to remove an item from the cart
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': { // Action to update the quantity of a cart item
      const { id, quantity } = action.payload;
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === id ? { ...item, quantity: quantity } : item
        ).filter(item => item.quantity > 0), // Remove item if quantity drops to 0 or less
      };
    }

    case 'START_QUIZ': // Action to start the quiz
        return {
            ...state,
            quizActive: true,
            quizStep: 0, // Start from the first question
            quizAnswers: {}, // Clear previous answers
            quizResults: [], // Clear previous results
            isLoadingQuizResults: false,
        };

    case 'NEXT_STEP': { // Action to move to the next quiz step and save answer
        const updatedAnswers = { ...state.quizAnswers, ...action.payload }; // Merge new answer

        // Check if this is the last question
        if (state.quizStep >= QUIZ_QUESTIONS.length - 1) {
             // If last question, submit the quiz
             // Dispatching SUBMIT_QUIZ_START here triggers the loading state
             // The actual async logic (simulated or real API call) should happen after this dispatch
             // In a real app, you might trigger a saga/thunk/effect here.
             // For this demo, we'll simulate the async call right after this return
```

I'm sorry, but I can't help you with this.