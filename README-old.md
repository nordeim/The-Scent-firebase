# AromaGenius E-Commerce Platform

Welcome to AromaGenius, an AI-powered e-commerce platform specializing in premium aromatherapy products. This Next.js application is designed to provide users with a seamless and personalized shopping experience.

## Features

-   **Intelligent Scent Finder**: AI-driven recommendations based on user mood, desired effects, and scent preferences.
-   **Interactive Scent Quiz**: A guided quiz to help users discover their perfect aromatherapy blends.
-   **Advanced Product Catalog**: Easy-to-navigate product listings with robust filtering and sorting capabilities.
-   **AR Product Visualization (Placeholder)**: Future capability to visualize products in the user's own space.
-   **Shopping Cart & Checkout (UI)**: Streamlined process for managing cart items and viewing order summaries.
-   **Admin Dashboard (Placeholder)**: Basic interface for viewing sales statistics, recent orders, and inventory.
-   **Dark/Light Mode**: Theme toggle for user preference.
-   **Responsive Design**: Optimized for various screen sizes.

## Tech Stack

-   **Next.js**: React framework for server-side rendering and static site generation.
-   **TypeScript**: For type safety and improved developer experience.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **ShadCN UI**: Re-usable components built with Radix UI and Tailwind CSS.
-   **Genkit (Firebase AI)**: For AI-powered features like scent recommendation. (Assumed based on existing `src/ai` folder)
-   **Lucide React**: For icons.

## Getting Started

To get started with the AromaGenius application:

1.  **Clone the repository** (if applicable).
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables**:
    Create a `.env.local` file in the root directory and add any necessary environment variables (e.g., for Firebase/Genkit configuration).
    Example:
    ```
    GOOGLE_API_KEY=your_google_api_key_here 
    # Add other Genkit related variables if needed
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:9002` (as per your package.json).

5.  **Run Genkit development server** (if you need to test/develop AI flows locally):
    ```bash
    npm run genkit:dev
    # or
    npm run genkit:watch 
    ```
    The Genkit developer UI will typically be available at `http://localhost:4000`.


## Project Structure

-   `src/app/`: Contains all routes, layouts, and pages using the Next.js App Router.
    -   `(pages)`: Route groups for main application pages (e.g., `/products`, `/quiz`, `/cart`).
    -   `api/`: API routes (if any).
    -   `layout.tsx`: The root layout for the application.
    -   `page.tsx`: The main home page.
    -   `globals.css`: Global styles and Tailwind CSS setup.
-   `src/components/`: Shared React components used across the application.
    -   `ui/`: ShadCN UI components.
    -   `layout/`: Navbar, Footer, etc.
    -   `products/`: ProductCard, ProductFilters, etc.
    -   `cart/`: CartItem, CartSummary, etc.
    -   `quiz/`: Quiz components.
    -   `home/`: Components specific to the home page sections.
    -   `admin/`: Components for the admin dashboard.
-   `src/contexts/`: React context providers for global state management (e.g., `AppContext.tsx`).
-   `src/lib/`: Utility functions, type definitions (`types.ts`), constants (`constants.ts`), and server actions.
-   `src/hooks/`: Custom React hooks.
-   `src/providers/`: Client-side providers like ThemeProvider.
-   `src/ai/`: Genkit AI flow definitions.
    -   `flows/`: Specific AI flow implementations (e.g., `recommend-scents.ts`).
-   `public/`: Static assets like images.
-   `next.config.ts`: Next.js configuration.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `tsconfig.json`: TypeScript configuration.

## Key Pages

-   **Home (`/`)**: Landing page with hero section, featured products, and key selling points.
-   **Products (`/products`)**: Catalog page with filtering and sorting.
-   **Product Detail (`/products/[id]`)**: Individual product page.
-   **Scent Quiz (`/quiz`)**: Interactive quiz to guide users.
-   **Quiz Results (`/quiz/results`)**: Displays personalized recommendations.
-   **Cart (`/cart`)**: Shopping cart view.
-   **AR View (`/ar`)**: Placeholder for Augmented Reality feature.
-   **Admin (`/admin`)**: Placeholder for admin dashboard.

This README provides an overview of the AromaGenius application. For more detailed information, please refer to the code and comments within the respective files.
