`useAppContext`.
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
```