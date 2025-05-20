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
. ├── public/ # Static assets (images, fonts) ├── src/ │ ├── @types/ # (Potentially) Custom type definitions │ ├── ai/ # AI-related code │ │ └── flows/ │ │ └── recommend-scents.ts # AI recommendation flow (GenKit) │ ├── app/ # App Router pages and layouts │ │ ├── (marketing)/ # Route group for marketing pages (homepage, quiz) │ │ │ ├── page.tsx # Homepage │ │ │ └── quiz/ │ │ │ └── page.tsx # Quiz page │ │ ├── admin/ │ │ │ └── page.tsx # Admin placeholder page │ │ ├── cart/ │ │ │ └── page.tsx # Cart page │ │ ├── checkout/ │ │ │ └── page.tsx # Checkout page (incomplete) │ │ ├── products/ │ │ │ ├── [productId]/ │ │ │ │ └── page.tsx # Product detail page (dynamic route) │ │ │ └── page.tsx # Product listing page │ │ ├── globals.css # Global styles │ │ └── layout.tsx # Root layout for all pages │ ├── components/ # Reusable React components │ │ ├── cart/ # Cart related components │ │ │ ├── CartClient.tsx │ │ │ ├── CartItem.tsx │ │ │ └── CartSummary.tsx │ │ ├── layout/ # Layout specific components (Navbar, Footer) │ │ │ ├── Footer.tsx │ │ │ └── Navbar.tsx │ │ ├── products/ # Product related components │ │ │ ├── ProductCard.tsx │ │ │ ├── ProductFilters.tsx │ │ │ └── ProductGrid.tsx │ │ ├── ui/ # Shadcn UI components (generated) │ │ │ └── ... │ │ └── ThemeToggle.tsx # Component for switching themes │ ├── contexts/ # React Context providers │ │ └── AppContext.tsx # Global application context │ ├── hooks/ # Custom React hooks │ │ └── use-toast.ts # Hook for displaying toasts │ ├── lib/ # Utility functions, constants, types │ │ ├── constants.ts # Application constants (mock data, options, etc.) │ │ └── types.ts # TypeScript type definitions │ └── providers/ # Context or wrapper providers │ └── ThemeProvider.tsx # Theme context provider ├── .eslintrc.json # ESLint configuration ├── .gitignore # Git ignore rules ├── next.config.mjs # Next.js configuration ├── package.json # Project dependencies and scripts ├── postcss.config.js # PostCSS configuration (for Tailwind) ├── README.md # Project README ├── tailwind.config.ts # Tailwind CSS configuration ├── tsconfig.json # TypeScript configuration └── genkit.dev.ts # GenKit development configuration
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

```tsx
typescript // src/app/layout.tsx import type { Metadata } from 'next'; import { GeistSans } from 'geist/font/sans'; import { GeistMono } from 'geist/font/mono'; import './globals.css'; // Global styles import { ThemeProvider } from '@/providers/ThemeProvider'; // Theme context import { AppContextProvider } from '@/contexts/AppContext'; // App state context import Navbar from '@/components/layout/Navbar'; // Navigation Bar import Footer from '@/components/layout/Footer'; // Footer import { Toaster } from "@/components/ui/toaster"; // Toast notification container

// Application metadata export const metadata: Metadata = { title: 'The Scent - Discover Your Signature Scent', description: 'AI-Powered Aromatherapy E-commerce Platform', };

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) { return ( // HTML tag with language and hydration warning suppression <html lang="en" suppressHydrationWarning> {/* Body tag with font classes and hydration warning suppression /} <body className={${GeistSans.variable} ${GeistMono.variable} font-sans antialiased} suppressHydrationWarning> {/ Theme Provider for light/dark mode /} <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange > {/ Application State Context Provider /} <AppContextProvider> {/ Flex column layout for sticky footer /} <div className="flex flex-col min-h-screen"> <Navbar /> {/ Navigation Bar /} <main className="flex-grow"> {/ Main content area, takes up remaining space /} {children} {/ Page content is rendered here /} </main> <Footer /> {/ Footer /} </div> <Toaster /> {/ Toaster for notifications */} </AppContextProvider> </ThemeProvider> </body> </html> ); }
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

```tsx
typescript // src/contexts/AppContext.tsx "use client"; // Client component to use hooks and context

import type { ReactNode } from 'react'; import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react'; import type { Product, CartItem, AppState, ProductAction, CartAction, QuizAction, // Assuming this type exists or is covered by AppAction AppAction, ProductState, CartState } from '@/lib/types'; // Import types import { MOCK_PRODUCTS, INITIAL_PRODUCT_STATE, INITIAL_CART_STATE, QUIZ_QUESTIONS } from '@/lib/constants'; // Import constants import { recommendScents, type RecommendScentsInput } from '@/ai/flows/recommend-scents'; // Import AI flow import { useToast } from '@/hooks/use-toast'; // Import toast hook

// --- Reducers ---

const productReducer = (state: ProductState, action: ProductAction): ProductState => { switch (action.type) { case 'SET_CATEGORY': return { ...state, category: action.payload }; case 'SET_SORT': return { ...state, sortBy: action.payload }; case 'SET_FILTER': // Merge new filters into existing filters // This assumes filters payload is an object like { price: [min, max] } or { scentFamilies: { scent1: true, scent2: false } } return { ...state, filters: { ...state.filters, ...action.payload } }; case 'RESET_FILTERS': return INITIAL_PRODUCT_STATE; default: return state; } };

const cartReducer = (state: CartState, action: CartAction): CartState => { switch (action.type) { case 'ADD_ITEM': { const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id); if (existingItemIndex > -1) { // Item exists, increment quantity const updatedItems = state.items.map((item, index) => index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item ); return { ...state, items: updatedItems }; } // Item is new, add with quantity 1 return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] }; } case 'REMOVE_ITEM': // Filter out the item by id return { ...state, items: state.items.filter(item => item.id !== action.payload) }; case 'UPDATE_QUANTITY': { // Remove item if quantity is 0 or less if (action.payload.quantity <= 0) { return { ...state, items: state.items.filter(item => item.id !== action.payload.id) }; } // Update quantity for the item return { ...state, items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item ), }; } // Other cart actions... case 'TOGGLE_CART': return { ...state, isOpen: !state.isOpen }; case 'CLOSE_CART': return { ...state, isOpen: false }; case 'CLEAR_CART': return { ...state, items: [] }; case 'INITIALIZE_CART': // Action to set initial cart items from storage // Ensure payload is an array of CartItem and handle potential type issues from localStorage const initialItems = Array.isArray(action.payload) ? action.payload : []; return { ...state, items: initialItems }; default: return state; } };

// --- Context Creation ---

// Define the shape of the context value interface AppContextValue extends AppState { dispatch: React.Dispatch<AppAction>; }

const AppContext = createContext<AppContextValue | undefined>(undefined);

// --- Context Provider Component ---

export const AppContextProvider = ({ children }: { children: ReactNode }) => { // State using useState (e.g., for products, quiz simple states) const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS); // Full list of products const [productState, productDispatch] = useReducer(productReducer, INITIAL_PRODUCT_STATE); // Filter/Sort state const [cartState, cartDispatch] = useReducer(cartReducer, INITIAL_CART_STATE); // Cart state

// Quiz specific state using useState const [quizActive, setQuizActive] = useState(false); // Is quiz currently active? const [quizStep, setQuizStep] = useState(0); // Current step in the quiz const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({}); // Collected quiz answers const [quizResults, setQuizResults] = useState<Product[]>([]); // Products recommended by AI const [isLoadingQuizResults, setIsLoadingQuizResults] = useState(false); // Loading state for AI call

const { toast } = useToast(); // Hook for toasts

// --- Combined Dispatch Function --- // This function routes actions to the correct reducer or state updater const combinedDispatch = useCallback(async (action: AppAction) => { // Use useCallback if passing down // Route actions to appropriate reducer or state updater if (['SET_CATEGORY', 'SET_SORT', 'SET_FILTER', 'RESET_FILTERS'].includes(action.type)) { productDispatch(action as ProductAction); } else if (['ADD_ITEM', 'REMOVE_ITEM', 'UPDATE_QUANTITY', 'TOGGLE_CART', 'CLOSE_CART', 'CLEAR_CART', 'INITIALIZE_CART'].includes(action.type)) { cartDispatch(action as CartAction); // Side effect: show toast for ADD_ITEM if (action.type === 'ADD_ITEM') { // Assuming the payload of ADD_ITEM is the product itself const productToAdd = (action as {payload: Product}).payload; toast({ title: "Added to Cart", description: ${productToAdd.name} has been added to your cart., // Optionally add an action button to view cart // action: <ToastAction altText="View Cart">View Cart</ToastAction>, }); } } else if (action.type === 'SET_PRODUCTS') { setProducts(action.payload); } // Quiz actions handled directly else { switch (action.type) { case 'START_QUIZ': setQuizActive(true); setQuizStep(0); setQuizAnswers({}); setQuizResults([]); setIsLoadingQuizResults(false); // Reset loading state break; case 'NEXT_STEP': // Update answers and move to next step, or submit if last step // Payload is { key: string, value: string } setQuizAnswers(prev => ({ ...prev, [action.payload.key]: action.payload.value })); if (quizStep < QUIZ_QUESTIONS.length - 1) { setQuizStep(s => s + 1); } else { // If last step, trigger the AI submission process combinedDispatch({ type: 'SUBMIT_QUIZ_START' }); } break; case 'SET_QUIZ_STEP': // Directly set quiz step (e.g., for navigation or resetting) setQuizStep(action.payload); break; case 'SUBMIT_QUIZ_START': setIsLoadingQuizResults(true); // Build input for the AI flow from collected answers const recommendInput: RecommendScentsInput = { mood: quizAnswers['mood'], // Assuming quiz questions collect these keys desiredEffect: quizAnswers['desiredEffect'], scentProfile: quizAnswers['scentProfile'], // Assuming this is a single string // Note: If scentProfile is multiple choices, the UI/quizAnswers structure // and the AI prompt would need adjustment. }; // Call the server AI flow function try { const aiResult = await recommendScents(recommendInput); // Process AI result and find matching products const recommendedNames = aiResult.productRecommendations;
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

// Effect to load cart on mount useEffect(() => { const storedCartItems = localStorage.getItem('aromaGeniusCart'); if (storedCartItems) { try { // Parse the stored JSON string back into an array of CartItem const items: CartItem[] = JSON.parse(storedCartItems); // Dispatch action to initialize the cart state with loaded items cartDispatch({ type: 'INITIALIZE_CART', payload: items }); } catch (error) { // Log parsing errors and potentially clear invalid data console.error("Failed to parse cart data from localStorage", error); localStorage.removeItem('aromaGeniusCart'); // Clear corrupted data } } }, []); // Empty dependency array ensures this runs only once on mount

// Effect to save cart whenever items change useEffect(() => { // Only save if there are items to avoid saving empty array unnecessarily or overwriting on initial load if (cartState.items.length > 0) { localStorage.setItem('aromaGeniusCart', JSON.stringify(cartState.items)); } else { // Remove the item from localStorage if the cart becomes empty localStorage.removeItem('aromaGeniusCart'); } }, [cartState.items]); // Rerun this effect whenever the cartState.items array changes

// --- Context Value --- // Combine all state pieces into a single value object const state: AppState = { products, productState, cartState, quizActive, quizStep, quizAnswers, quizResults, isLoadingQuizResults, };

return ( // Provide the state and the combined dispatch function to the context <AppContext.Provider value={{ ...state, dispatch: combinedDispatch }}> {children} {/* Render children components */} </AppContext.Provider> ); };

// --- Custom Hook for Consumption --- // This hook makes it easier for components to access the AppContext value export const useAppContext = (): AppContextValue => { const context = useContext(AppContext); if (context === undefined) { // Throw an error if the hook is used outside of the provider, aiding debugging throw new Error('useAppContext must be used within an AppContextProvider'); } return context; };
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
*   **Dependencies:** Imports `Link` from `next/link`, components from Shadcn UI (`Button`, `Sheet`, `SheetTrigger`, `SheetContent`, `Separator`), custom components (`ThemeToggle`), icons (`Menu`, `ShoppingCart`), and the `useAppContext` hook.
*   **Code Snippet (Structure):**

```tsx
typescript // src/components/layout/Navbar.tsx "use client"; // Client component as it uses hooks and interactivity

import Link from 'next/link'; // For client-side navigation import { Menu, ShoppingCart } from 'lucide-react'; // Icons

import { Button } from '@/components/ui/button'; // Shadcn button import { Sheet, // Shadcn Sheet for mobile drawer SheetContent, SheetTrigger, } from '@/components/ui/sheet'; import { Separator } from '@/components/ui/separator'; // Shadcn separator

import { ThemeToggle } from '@/components/ThemeToggle'; // Theme switcher component import { useAppContext } from '@/contexts/AppContext'; // App state context

export default function Navbar() { // Access cart state and dispatch function from context const { cartState, dispatch } = useAppContext(); const cartItemCount = cartState.items.length; // Get number of items in cart

// Handler to toggle cart sidebar visibility const handleCartToggle = () => { dispatch({ type: 'TOGGLE_CART' }); };

return ( // Sticky navigation bar at the top, with background blur <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"> <div className="container flex h-16 items-center justify-between px-4 md:px-6"> {/* Site Title/Logo - Linked to homepage */} <Link href="/" className="mr-4 text-lg font-bold"> The Scent </Link>
    {/* Desktop Navigation Links (hidden on small screens) */}
    <div className="hidden items-center space-x-4 sm:flex">
      <Link href="/" className="hover:text-accent-foreground">
        Home
      </Link>
      <Link href="/products" className="hover:text-accent-foreground">
        Products
      </Link>
      <Link href="/quiz" className="hover:text-accent-foreground">
        Quiz
      </Link>
    </div>

    {/* Right side elements: Theme Toggle, Cart Icon, Mobile Menu Trigger */}
    <div className="flex items-center space-x-2">
      <ThemeToggle /> {/* Theme switcher component */}

      {/* Cart Button with item count badge */}
      <Button variant="ghost" size="icon" onClick={handleCartToggle} aria-label="Open Cart">
        <ShoppingCart className="h-5 w-5" />
        {/* Conditional rendering of badge if cart has items */}
        {cartItemCount > 0 && (

```
**Code Snippet (Structure):**


typescript // src/components/layout/Navbar.tsx "use client"; // Client component as it uses hooks and interactivity

import Link from 'next/link'; // For client-side navigation import { Menu, ShoppingCart } from 'lucide-react'; // Icons

import { Button } from '@/components/ui/button'; // Shadcn button import { Sheet, // Shadcn Sheet for mobile drawer SheetContent, SheetTrigger, } from '@/components/ui/sheet'; import { Separator } from '@/components/ui/separator'; // Shadcn separator

import { ThemeToggle } from '@/components/ThemeToggle'; // Theme switcher component import { useAppContext } from '@/contexts/AppContext'; // App state context import { useState } from 'react'; // To manage mobile sheet state

export default function Navbar() { // Access cart state and dispatch function const { cartState, dispatch } = useAppContext(); const cartItemCount = cartState.items.length; // Get number of items in cart

// State to control mobile sheet open/close const [isSheetOpen, setIsSheetOpen] = useState(false);

// Handler to toggle cart sidebar const handleCartToggle = () => { dispatch({ type: 'TOGGLE_CART' }); };

// Handler to close the mobile sheet (used on link clicks) const closeSheet = () => { setIsSheetOpen(false); };

return ( // Sticky navigation bar at the top, with background blur <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"> <div className="container flex h-16 items-center justify-between px-4 md:px-6"> {/* Site Title/Logo - Linked to homepage */} <Link href="/" className="mr-4 text-lg font-bold"> The Scent </Link>

    {/* Desktop Navigation Links (hidden on small screens) */}
    <div className="hidden items-center space-x-4 sm:flex">
      <Link href="/" className="hover:text-accent-foreground">
        Home
      </Link>
      <Link href="/products" className="hover:text-accent-foreground">
        Products
      </Link>
      <Link href="/quiz" className="hover:text-accent-foreground">
        Quiz
      </Link>
       {/* Example of a placeholder admin link */}
      {/* <Link href="/admin" className="text-sm text-muted-foreground hover:text-accent-foreground">
        Admin (Placeholder)
      </Link> */}
    </div>

    {/* Right side elements: Theme Toggle, Cart Icon, Mobile Menu Trigger */}
    <div className="flex items-center space-x-2">
      <ThemeToggle /> {/* Theme switcher component */}

      {/* Cart Button with item count badge */}
      <Button variant="ghost" size="icon" onClick={handleCartToggle} aria-label="Open Cart">
        <ShoppingCart className="h-5 w-5" />
        {/* Conditional rendering of badge if cart has items */}
        {cartItemCount > 0 && (
          <span className="absolute right-0 top-0 -mr-1 -mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary p-1 text-xs text-primary-foreground">
            {cartItemCount}
          </span>
        )}
      </Button>

      {/* Mobile Menu Trigger (visible on small screens) */}
      {/* Use Sheet component for the mobile drawer */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild className="sm:hidden">
          <Button variant="ghost" size="icon" aria-label="Toggle Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right"> {/* Drawer slides from the right */}
          {/* Mobile Menu Content */}
          <div className="flex flex-col space-y-4 py-6"> {/* Added padding */}
             {/* Site Title/Logo in mobile menu */}
             <Link href="/" className="text-lg font-bold px-4" onClick={closeSheet}> {/* Added padding and close handler */}
                The Scent
             </Link>
             <Separator /> {/* Separator line */}
             {/* Mobile Navigation Links */}
             <Link href="/" className="px-4 hover:text-accent-foreground" onClick={closeSheet}> {/* Added padding and close handler */}
               Home
             </Link>
             <Link href="/products" className="px-4 hover:text-accent-foreground" onClick={closeSheet}> {/* Added padding and close handler */}
               Products
             </Link>
             <Link href="/quiz" className="px-4 hover:text-accent-foreground" onClick={closeSheet}> {/* Added padding and close handler */}
               Quiz
             </Link>
             {/* Example Admin Link in mobile */}
             {/* <Link href="/admin" className="px-4 text-sm text-muted-foreground hover:text-accent-foreground" onClick={closeSheet}>
               Admin (Placeholder)
             </Link> */}
             <Separator /> {/* Separator line */}
             {/* Theme Toggle in mobile menu, centered */}
             <div className="flex justify-center px-4"> {/* Centered */}
                <ThemeToggle />
             </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</nav>


); }

*   **Explanation:** The `Navbar` is a client component to handle user interactions (button clicks, mobile menu toggle). It uses flexbox to arrange its elements horizontally. Desktop navigation links are shown directly, while on smaller screens, a Shadcn `Sheet` component provides a drawer for the navigation items. The cart icon dynamically displays the number of items in the cart by accessing `cartState` from the `AppContext`. Clicking the cart icon dispatches an action to the context to control the visibility of the cart sidebar (which is likely rendered elsewhere, perhaps in the root layout or a component wrapping the page content). The use of `Link` from `next/link` ensures efficient client-side navigation without full page reloads. State management (`useState`) is added to control the open/close state of the mobile sheet, and a handler `closeSheet` is used on link clicks within the sheet to automatically close it after navigation.

#### `src/components/layout/Footer.tsx`

*   **Description:** The footer component displayed at the bottom of every page (via `RootLayout`).
*   **Purpose:** Provides copyright information, potentially quick links, social media icons, or other boilerplate footer content.
*   **Key Features/Logic:**
    *   Simple functional component rendering static content.
    *   Includes a copyright notice, dynamically updated with the current year.
    *   Provides example navigation links within the footer structure.
    *   Uses basic flexbox or grid for layout and spacing.
*   **Interfaces/Props:** None.
*   **Dependencies:** Imports `Link` from `next/link`.
*   **Code Snippet (Structure):**


typescript // src/components/layout/Footer.tsx import Link from 'next/link'; // For internal links

export default function Footer() { const currentYear = new Date().getFullYear(); // Get current year dynamically

return ( // Footer element with top border and background blur <footer className="mt-auto w-full border-t bg-background/80 backdrop-blur-sm"> {/* mt-auto pushes footer down /} <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row md:py-12 px-4 md:px-6"> {/ Copyright information */} <div className="text-center text-sm leading-loose text-muted-foreground md:text-left"> © {currentYear} The Scent. All rights reserved. </div>

    {/* Footer Navigation Links (Example) */}
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground md:justify-end">
      <Link href="/about" className="hover:text-accent-foreground">
        About Us
      </Link>
      <Link href="/contact" className="hover:text-accent-foreground">
        Contact
      </Link>
      <Link href="/privacy" className="hover:text-accent-foreground">
        Privacy Policy
      </Link>
      <Link href="/terms" className="hover:text-accent-foreground">
        Terms of Service
      </Link>
       {/* Example Admin Link in footer */}
      {/* <Link href="/admin" className="text-muted-foreground hover:text-accent-foreground">
        Admin
      </Link> */}
    </div>
    {/* Potentially add social media icons or other widgets here */}
  </div>
</footer>


); }

*   **Explanation:** The `Footer` is a simple React component. It utilizes `mt-auto` (margin-top auto) when placed within a flex column container (`min-h-screen` on its parent) to ensure it is pushed to the bottom of the viewport when content is short. It contains static text and example navigation links, useful for providing legal or contact information. The copyright year is dynamically generated.

### 3.4 Cart Components (`src/components/cart`)

This directory contains components specifically related to displaying and managing the shopping cart UI.

#### `src/components/cart/CartClient.tsx`

*   **Description:** The main client component for the shopping cart page (`/cart`).
*   **Purpose:** Orchestrates the display of cart items and the order summary. It fetches the cart state from the `AppContext` and renders either a list of items and the summary or a message indicating the cart is empty.
*   **Key Features/Logic:**
    *   Uses `useAppContext` to get the current `cartState`.
    *   Checks `cartState.items.length` to determine if the cart is empty.
    *   If not empty, it renders a list of `CartItem` components (mapping over `cartState.items`) and the `CartSummary` component.
    *   If empty, it displays a user-friendly message and a link back to the products page using a Shadcn `Button` wrapped around a `Link` (`asChild`).
    *   This component acts as a container and manager for the cart view layout.
*   **Interfaces/Props:** None. Relies on `useAppContext`.
*   **Dependencies:** Imports `useAppContext`, `CartItem`, `CartSummary`, components from Shadcn UI (`Button`, `Card`, `CardContent`), and icons (`ShoppingCart`). Imports `Link` from `next/link`.
*   **Code Snippet (Structure):**


typescript // src/components/cart/CartClient.tsx "use client"; // Client component to access context and interactivity

import Link from 'next/link'; // For navigation back to products import { ShoppingCart } from 'lucide-react'; // Icon for empty cart message

import { useAppContext } from '@/contexts/AppContext'; // App state context import { Button } from '@/components/ui/button'; // Button component import { Card, CardContent } from '@/components/ui/card'; // Card component for structure

import CartItem from './CartItem'; // Component for individual cart item import CartSummary from './CartSummary'; // Component for order summary

export default function CartClient() { // Access cart state from context const { cartState } = useAppContext(); const cartItems = cartState.items; // Get the array of cart items

const isEmpty = cartItems.length === 0; // Check if cart is empty

return ( // Main container for the cart page layout <div className="container mx-auto py-8 px-4 md:px-6"> <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

  {/* Conditional rendering based on whether the cart is empty */}
  {isEmpty ? (
    // Display message and link when cart is empty
    <div className="flex flex-col items-center justify-center py-12">
      <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" /> {/* Empty cart icon */}
      <p className="text-xl text-muted-foreground mb-6">Your cart is empty.</p> {/* Empty message */}
      {/* Button linking back to the products page */}
      <Button asChild> {/* Use asChild to render Link inside Button */}
        <Link href="/products">Shop Products</Link>
      </Button>
    </div>
  ) : (
    // Display cart items and summary when cart is not empty
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Responsive grid layout */}
      {/* Cart Items List - takes 2 columns on medium screens and above */}
      <div className="md:col-span-2">
        <Card> {/* Card wrapper for the item list */}
          <CardContent className="p-4"> {/* Padding inside the card */}
            <div className="space-y-4"> {/* Vertical spacing between items */}
              {/* Map over cart items and render CartItem for each */}
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} /> // Render individual CartItem component
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary - takes 1 column on medium screens and above */}
      <div className="md:col-span-1">
        <CartSummary items={cartItems} /> {/* Render CartSummary component, passing cart items */}
      </div>
    </div>
  )}
</div>


); }

*   **Explanation:** This component acts as the view layer for the `/cart` route. It uses the `isEmpty` flag to conditionally render either an empty cart message or the list of items and the summary. It iterates over the `cartItems` array, rendering a `CartItem` component for each, and passes the entire `cartItems` array to the `CartSummary` component. This separation of concerns keeps the main cart component clean and focused on layout and conditional rendering. Shadcn `Card` components provide visual structure, and Tailwind CSS grid classes handle the responsive layout.

#### `src/components/cart/CartItem.tsx`

*   **Description:** Displays a single item within the shopping cart list.
*   **Purpose:** Shows item details (image, name, price), allows updating the item's quantity, and provides an option to remove the item from the cart.
*   **Key Features/Logic:**
    *   Accepts an `item` prop (`CartItem` type) containing item details and quantity.
    *   Displays the item's image using `next/image`, name (linked to product page), and price.
    *   Provides quantity controls (buttons to increment/decrement). Clicking these dispatches `UPDATE_QUANTITY` actions to the `AppContext`.
    *   Includes a "Remove" button that dispatches a `REMOVE_ITEM` action to the `AppContext`.
    *   Uses `useAppContext` to access the `dispatch` function.
    *   Uses icons (`Plus`, `Minus`, `X`) from `lucide-react` for quantity controls and removal.
*   **Interfaces/Props:** Accepts an `item` prop of type `CartItem`.
*   **Dependencies:** Imports `Image` from `next/image`, `Link` from `next/link`, `useAppContext`, components from Shadcn UI (`Button`), icons (`Plus`, `Minus`, `X`), and type definitions (`CartItem`).
*   **Code Snippet (Structure):**


typescript // src/components/cart/CartItem.tsx "use client"; // Client component for interactivity and context access

import Image from 'next/image'; // For displaying product image import Link from 'next/link'; // Link to product detail page import { Plus, Minus, X } from 'lucide-react'; // Icons for quantity and remove

import { useAppContext } from '@/contexts/AppContext'; // App state context import { Button } from '@/components/ui/button'; // Button component // import { Input } from '@/components/ui/input'; // Input for quantity (optional alternative) import type { CartItem } from '@/lib/types'; // Import CartItem type

interface CartItemProps { item: CartItem; // Prop: the cart item data }

export default function CartItem({ item }: CartItemProps) { // Access dispatch from context const { dispatch } = useAppContext();

// Handler to update the quantity of the item const handleUpdateQuantity = (newQuantity: number) => { dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } }); };

// Handler to remove the item from the cart const handleRemoveItem = () => { dispatch({ type: 'REMOVE_ITEM', payload: item.id }); };

return ( // Flex container for a single cart item row <div className="flex items-center py-4 border-b last:border-b-0"> {/* Adds bottom border except for the last item /} {/ Product Image Container /} <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-md border"> {/ Next.js Image component for optimized images */} <Image src={item.image} // Image source URL alt={item.name} // Alt text for accessibility fill // Fill the parent container sizes="(max-width: 768px) 80px, 96px" // Define image sizes based on viewport className="object-cover object-center" // Ensure image covers the container /> </div>

  {/* Item Details and Controls */}
  <div className="ml-4 flex flex-1 flex-col"> {/* Takes remaining space */}
    <div className="flex justify-between">
      {/* Product Name (linked to product detail page) */}
      <div className="flex-1">
        <Link href={`/products/${item.id}`} className="text-lg font-medium hover:underline">
          {item.name}
        </Link>
        {/* Potentially add product description snippet or variant info here */}
        {/* <p className="text-sm text-muted-foreground">{item.description.substring(0, 50)}...</p> */}
      </div>

      {/* Item Price */}
      <p className="ml-4 text-base font-medium text-gray-900 dark:text-gray-100">${item.price.toFixed(2)}</p>
    </div>

    {/* Quantity Controls and Remove Button */}
    <div className="flex flex-1 items-end justify-between text-sm mt-2">
      {/* Quantity Controls */}
      <div className="flex items-center">
        {/* Decrease quantity button, disabled if quantity is 1 */}
        <Button variant="outline" size="icon" className="h-7 w-7"
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity">
          <Minus className="h-4 w-4" />
        </Button>
        {/* Quantity Display (can be an Input or just text) */}
         <span className="px-3 text-base font-medium">{item.quantity}</span>
         {/* Example using Input (requires more state management): */}
         {/* <Input type="number" value={item.quantity} readOnly className="w-12 text-center mx-2" /> */}
        {/* Increase quantity button */}
        <Button variant="outline" size="icon" className="h-7 w-7"
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                aria-label="Increase quantity">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Remove Item Button */}
      <Button variant="ghost" size="icon" onClick={handleRemoveItem} aria-label="Remove item from cart">
        <X className="h-5 w-5 text-muted-foreground hover:text-foreground" /> {/* Remove icon */}
      </Button>
    </div>
  </div>
</div>


); }

*   **Explanation:** This component is responsible for the UI and interaction logic for a single item in the cart. It receives the item data as a prop. Quantity adjustments and item removal are handled by dispatching actions (`UPDATE_QUANTITY`, `REMOVE_ITEM`) back to the `AppContext`, which then updates the global cart state. The component uses icons and buttons for a clear user interface. The image is displayed using `next/image` for optimization, and the product name links to the product detail page. Tailwind CSS classes are used for layout and styling.

#### `src/components/cart/CartSummary.tsx`

*   **Description:** Displays the order summary details on the cart page.
*   **Purpose:** Shows calculated totals (subtotal, shipping, tax, total) and provides a button to proceed to checkout. It currently contains static values for shipping and tax and a placeholder for a promo code.
*   **Key Features/Logic:**
    *   Accepts an `items` prop (array of `CartItem`).
    *   Calculates the subtotal by summing `price * quantity` for all items.
    *   Displays the calculated subtotal.
    *   Includes static placeholders for shipping and estimated tax for demonstration purposes.
    *   Calculates a static total based on subtotal, shipping, and tax.
    *   Includes a placeholder/non-functional promo code input section.
    *   Provides a "Proceed to Checkout" button, likely a `Link` to `/checkout` rendered within a `Button` (`asChild`). The button is disabled if the cart is empty.
    *   Uses Shadcn `Card` components for structure and `Label` and `Input` for the promo code section.
*   **Interfaces/Props:** Accepts an `items` prop of type `CartItem[]`.
*   **Dependencies:** Imports `Link` from `next/link`, components from Shadcn UI (`Button`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`, `Input`, `Label`), and type definitions (`CartItem`).
*   **Code Snippet (Structure):**


typescript // src/components/cart/CartSummary.tsx import Link from 'next/link'; // Link to checkout page import { Card, // Shadcn Card for structure CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'; import { Button } from '@/components/ui/button'; // Button component import { Input } from '@/components/ui/input'; // Input for promo code import { Label } from '@/components/ui/label'; // Label for input import type { CartItem } from '@/lib/types'; // Import CartItem type

interface CartSummaryProps { items: CartItem[]; // Prop: array of cart items to summarize }

export default function CartSummary({ items }: CartSummaryProps) { // Calculate subtotal by reducing the array of items const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Static values for shipping and tax for demo purposes (should be dynamic in production) const shippingEstimate = 5.00; const taxEstimate = subtotal * 0.08; // Example: 8% tax rate

// Calculate the total amount const total = subtotal + shippingEstimate + taxEstimate;

return ( // Card component for the order summary section <Card> <CardHeader> <CardTitle>Order Summary</CardTitle> {/* Card title /} </CardHeader> <CardContent className="grid gap-4"> {/ Content area with grid layout and spacing /} {/ Subtotal Row /} <div className="flex items-center justify-between"> <div>Subtotal</div> <div>${subtotal.toFixed(2)}</div> {/ Display subtotal formatted to 2 decimal places */} </div>

    {/* Shipping Row (Static) */}
    <div className="flex items-center justify-between">
      <div>Shipping Estimate</div>
      <div>${shippingEstimate.toFixed(2)}</div> {/* Display static shipping cost */}
    </div>

    {/* Estimated Tax Row (Static Calculation) */}
    <div className="flex items-center justify-between">
      <div>Estimated Tax</div>
      <div>${taxEstimate.toFixed(2)}</div> {/* Display calculated tax */}
    </div>

    {/* Placeholder for Promo Code Input */}
    <div className="grid gap-2"> {/* Grid layout for label and input */}
        <Label htmlFor="promo">Promo Code</Label> {/* Label for the input */}
        <div className="flex gap-2"> {/* Flex container for input and button */}
          <Input id="promo" type="text" placeholder="Enter code" /> {/* Input field */}
          <Button variant="secondary">Apply</Button> {/* Apply button (non-functional) */}
        </div>
    </div>

    {/* Total Row */}
    <div className="flex items-center justify-between font-semibold text-lg"> {/* Bold text for the total */}
      <div>Order Total</div>
      <div>${total.toFixed(2)}</div> {/* Display the total formatted */}
    </div>
  </CardContent>
  <CardFooter> {/* Footer area of the card */}
    {/* Proceed to Checkout Button (linked to /checkout) */}
    <Button asChild className="w-full" disabled={items.length === 0}> {/* Full width button, disabled if cart is empty */}
      {/* Use asChild to render Link inside Button */}
      <Link href="/checkout" aria-disabled={items.length === 0}> {/* Link to checkout page */}
         Proceed to Checkout
      </Link>
    </Button>
  </CardFooter>
</Card>


); }

*   **Explanation:** This component focuses purely on presenting the summary calculations. It takes the array of items as input and performs the necessary arithmetic (currently just subtotal, with static values for others). The use of static values for shipping and tax, and the non-functional promo code section, highlight areas for future development where integration with a backend or external service would be required. The "Proceed to Checkout" button is linked to the `/checkout` route and is disabled if the cart is empty, preventing users from attempting to checkout with an empty cart. Shadcn UI components provide the visual structure and form elements.

### 3.5 Product Components (`src/components/products`)

This directory contains components related to displaying product listings, filters, and individual product cards.

#### `src/components/products/ProductFilters.tsx`

*   **Description:** Provides UI controls for filtering and sorting the product list.
*   **Purpose:** Allows users to select categories, scent families, price ranges, and sorting options. It interacts with the `AppContext` to update the product filtering and sorting state, which in turn affects the products displayed in `ProductGrid`.
*   **Key Features/Logic:**
    *   Uses `useAppContext` to access the current `productState` (to reflect current filters/sort) and `dispatch` (to apply changes).
    *   Renders UI elements for:
        *   Category selection (using Shadcn `Select`). Dispatches `SET_CATEGORY`.
        *   Price Range slider (using Shadcn `Slider`). Dispatches `SET_FILTER` with price range filter.
        *   Scent Family selection (example structure using Checkboxes - commented out but logic outlined). Dispatches `SET_FILTER`.
        *   Sorting options (using Shadcn `Select`). Dispatches `SET_SORT`.
    *   Includes a "Reset Filters" button that dispatches `RESET_FILTERS`.
    *   Reads available filter/sort options and default states from constants (`@/lib/constants`).
*   **Interfaces/Props:** None. Relies on `useAppContext`.
*   **Dependencies:** Imports `useAppContext`, components from Shadcn UI (`Select`, `SelectTrigger`, `SelectContent`, `SelectGroup`, `SelectLabel`, `SelectItem`, `Slider`, `Button`, `Separator`, `Label`), and constants (`CATEGORIES`, `SCENT_FAMILIES`, `SORT_OPTIONS`, `MAX_PRICE`).
*   **Code Snippet (Structure):**


typescript // src/components/products/ProductFilters.tsx "use client"; // Client component for interactivity and context access

import { useAppContext } from '@/contexts/AppContext'; // App state context import { Button } from '@/components/ui/button'; // Button for reset import { Label } from '@/components/ui/label'; // Label for form controls import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; // Select for dropdowns import { Slider } from '@/components/ui/slider'; // Slider for price range import { Separator } from '@/components/ui/separator'; // Separator for visual separation // import { Checkbox } from '@/components/ui/checkbox'; // Checkbox (if implementing scent family filter with checkboxes) import { ScrollArea } from '@/components/ui/scroll-area'; // ScrollArea for long lists of filters (optional)

// Import constants for filter/sort options and initial state import { CATEGORIES, SCENT_FAMILIES, SORT_OPTIONS, MAX_PRICE } from '@/lib/constants';

export default function ProductFilters() { // Access product state (current filters/sort) and dispatch function from context const { productState, dispatch } = useAppContext();

// Handlers for dispatching filter/sort change actions const handleCategoryChange = (value: string) => { dispatch({ type: 'SET_CATEGORY', payload: value }); };

const handleSortChange = (value: string) => { dispatch({ type: 'SET_SORT', payload: value }); };

// Handler for price range slider changes const handlePriceRangeChange = (value: number[]) => { // Dispatch a SET_FILTER action with the price range // Assuming the filter state in AppContext can handle an object like { price: [min, max] } dispatch({ type: 'SET_FILTER', payload: { price: value } }); };

// Handler for scent family checkbox changes (Example - requires Checkbox component and state logic) const handleScentFamilyChange = (scent: string, checked: boolean) => { // Dispatch a SET_FILTER action to update scent family checkboxes state // This logic in the reducer would need to add/remove the scent from an array or update a map // Example payload structure: { scentFamilies: { [scent]: checked } } dispatch({ type: 'SET_FILTER', payload: { scentFamilies: { [scent]: checked } } }); };

// Handler for resetting all filters const handleResetFilters = () => { dispatch({ type: 'RESET_FILTERS' }); };

// Extract current filter/sort values from productState for displaying current selections const currentCategory = productState.category; const currentSortBy = productState.sortBy; // Use default range if price filter is not set const currentPriceRange = productState.filters.price || [0, MAX_PRICE]; // Use empty object as default if scentFamilies filter is not set const currentScentFamilies = productState.filters.scentFamilies || {};

return ( // Container with vertical spacing <div className="space-y-6"> {/* Header with Title and Reset Button /} <div className="flex justify-between items-center"> <h3 className="text-lg font-semibold">Filters & Sort</h3> <Button variant="ghost" size="sm" onClick={handleResetFilters}> Reset Filters </Button> </div> <Separator /> {/ Horizontal separator */}

  {/* Category Filter Section */}
  <div className="grid gap-2"> {/* Grid layout for label and select */}
    <Label htmlFor="category-filter">Category</Label> {/* Label for the select */}
    {/* Select component for category selection */}
    <Select value={currentCategory} onValueChange={handleCategoryChange}>
      <SelectTrigger id="category-filter">
        <SelectValue placeholder="Select a category" /> {/* Placeholder text */}
      </SelectTrigger>
      <SelectContent> {/* Dropdown content */}
        <SelectItem value="all">All Categories</SelectItem> {/* Option for all categories */}
        {/* Map over CATEGORIES constant to generate select items */}
        {CATEGORIES.map(category => (
          <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  <Separator /> {/* Horizontal separator */}

  {/* Price Range Filter Section */}
  <div className="grid gap-4"> {/* Grid layout with more gap for slider */}
    <Label htmlFor="price-range">Price Range</Label> {/* Label for the slider */}
    {/* Display the current selected price range */}
    <div className="flex justify-between text-sm text-muted-foreground">
        <span>${currentPriceRange[0].toFixed(2)}</span>
        <span>${currentPriceRange[1].toFixed(2)}</span>
    </div>
    {/* Slider component for price range selection */}
    <Slider
      id="price-range"
      min={0} // Minimum value
      max={MAX_PRICE} // Maximum value from constants
      step={1} // Step increment
      range={true} // Enable range selection (two handles)
      value={currentPriceRange} // Current value (an array [min, max])
      onValueChange={handlePriceRangeChange} // Handler for value changes
    />
  </div>
  <Separator /> {/* Horizontal separator */}

   {/* Scent Family Filter Section (Example using Checkboxes - requires more complex rendering and state logic) */}
   {/* This section is commented out in the provided code snippet but outlines the structure */}
   {/*
   <div className="grid gap-2">
       <Label>Scent Family</Label>
       <ScrollArea className="h-[200px] pr-4"> // Optional: Use ScrollArea if the list is long
           <div className="grid grid-cols-2 gap-2"> // Example grid for checkboxes
               {SCENT_FAMILIES.map(scent => (
                   <div key={scent} className="flex items-center space-x-2">
                       <Checkbox
                           id={`scent-${scent}`}
                           checked={!!currentScentFamilies[scent]} // Check if scent is in filter state object
                           onCheckedChange={(checked: boolean) => handleScentFamilyChange(scent, checked)}
                       />
                       <Label htmlFor={`scent-${scent}`}>{scent}</Label>
                   </div>
               ))}
           </div>
       </ScrollArea>
   </div>
   <Separator />
   */}

  {/* Sort By Section */}
  <div className="grid gap-2"> {/* Grid layout for label and select */}
    <Label htmlFor="sort-by">Sort By</Label> {/* Label for the select */}
    {/* Select component for sorting option selection */}
    <Select value={currentSortBy} onValueChange={handleSortChange}>
      <SelectTrigger id="sort-by">
        <SelectValue placeholder="Sort products" /> {/* Placeholder text */}
      </SelectTrigger>
      <SelectContent> {/* Dropdown content */}
        {/* Map over SORT_OPTIONS constant to generate select items */}
        {SORT_OPTIONS.map(option => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>





Ask Gemini or type /

