the state and dispatch for filtering and sorting.
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