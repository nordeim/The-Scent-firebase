# Aroma Genius: AI-Powered Aromatherapy E-commerce Platform

![Aroma Genius Banner](https://your-image-url-here.com/aromagenius-banner.png) <!-- Replace with an actual project banner/logo -->

## Project Overview

Welcome to the Aroma Genius GitHub repository! This project is a modern, full-stack e-commerce platform specializing in aromatherapy products. What sets Aroma Genius apart is its innovative AI-powered quiz, designed to provide personalized scent recommendations to users based on their mood, preferences, and desired therapeutic effects. This platform is built with a developer-friendly architecture, leveraging the latest in web development technologies to deliver a seamless and intuitive user experience.

Our goal is to create a comprehensive e-commerce solution that not only facilitates the browsing and purchase of aromatherapy products but also enhances the discovery process through intelligent recommendations. This repository serves as the central hub for the Aroma Genius project, providing the complete codebase, detailed technical documentation, and a collaborative environment for developers to contribute.

Whether you're interested in contributing to the front-end user interface, enhancing the back-end API (or exploring the AI integration further), or improving the overall platform infrastructure, there's ample opportunity to get involved and make a significant impact on a project that blends technology with well-being.

## Features

Aroma Genius comes packed with features designed to provide a robust e-commerce experience:

*   **Product Catalog:** A comprehensive listing of aromatherapy products with detailed information.
*   **Product Filtering and Sorting:** Users can easily filter products by category, price range, and other attributes, and sort them by price or name.
*   **Product Detail Pages:** Dedicated pages for each product displaying images, descriptions, and pricing.
*   **Shopping Cart:** A persistent shopping cart to manage selected products before checkout.
*   **AI Scent Recommender Quiz:** A unique, interactive quiz that uses user input to provide personalized product recommendations.
*   **User Authentication (Planned):** Secure user registration and login system. (Note: This feature is planned and may not be fully implemented in the initial public release.)
*   **Order Management (Planned):** Functionality for users to view their order history and administrators to manage orders. (Note: This feature is planned and may not be fully implemented in the initial public release.)
*   **Admin Dashboard (Planned):** A separate interface for administrators to manage products, orders, and users. (Note: This feature is planned and may not be fully implemented in the initial public release.)
*   **Responsive Design:** The platform is designed to be fully responsive, providing an optimal viewing experience across various devices (desktops, tablets, and mobile phones).
*   **Modern User Interface:** Built with a clean and intuitive interface using Shadcn UI components and Tailwind CSS.

## Technology Stack

Aroma Genius is built using a modern and robust technology stack:

**Frontend:**

*   **Next.js:** A React framework for server-side rendering, static site generation, and building performant web applications.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A strongly typed superset of JavaScript that improves code maintainability and reduces errors.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Shadcn UI:** A collection of re-usable components built with Radix UI and Tailwind CSS, providing a consistent and accessible design system.
*   **Zustand (or similar state management):** A small, fast, and scalable bearbones state-management solution using simplified flux principles (or similar approach for managing application state like cart, product filters, and quiz state).

**Backend:**

*   **Next.js API Routes:** Used for building serverless API endpoints (for future features like authentication, order processing, and potentially AI model interaction).
*   **Node.js:** The JavaScript runtime environment.
*   **(Potential) Database:** A database solution will be integrated for storing product data, user information, orders, etc. (e.g., PostgreSQL, MongoDB, or a serverless option). (Note: Mock data is currently used for products.)
*   **AI Model (Conceptual/Future Integration):** Integration with an AI model or service for the personalized recommendations based on quiz results. (Note: The current AI quiz logic in the provided code is illustrative and would require a backend implementation to connect with a real AI model.)

**Other Tools:**

*   **Git:** Version control system.
*   **GitHub:** Hosting for the code repository.
*   **npm or Yarn or pnpm:** Package manager.

This technology stack is chosen for its performance, developer experience, scalability, and maintainability, making Aroma Genius a great project to learn from and contribute to.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** Version 18 or higher is recommended. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm, Yarn, or pnpm:** A package manager. If you have Node.js installed, npm is included. You can find instructions for Yarn or pnpm on their respective websites.
*   **Git:** You can download Git from [git-scm.com](https://git-scm.com/).

### Installation

1.  **Clone the repository:**

    
```bash
git clone https://github.com/your-username/aroma-genius.git
```

    Replace `your-username/aroma-genius` with the actual repository path.

2.  **Navigate to the project directory:**

    
```bash
cd aroma-genius
```

3.  **Install dependencies:**

    Using npm:

    
```bash
npm install
```

    Using Yarn:

    
```bash
yarn install
```

    Using pnpm:

    
```bash
pnpm install
```

### Running Locally

1.  **Run the development server:**

    Using npm:

    
```bash
npm run dev
```

    Using Yarn:

    
```bash
yarn dev
```

    Using pnpm:

    
```bash
pnpm dev
```

2.  **Open your browser:**

    Once the development server starts, open your web browser and navigate to `http://localhost:3000`.

    You should see the Aroma Genius homepage. You can now explore the product catalog, try the AI quiz, and interact with the shopping cart.

## Project Structure

The Aroma Genius codebase follows a standard Next.js application structure with thoughtful organization to enhance readability and maintainability.

```
aroma-genius/
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                # App Router pages and routes
│   │   ├── (marketing)/    # Route group for marketing pages (homepage, quiz)
│   │   │   ├── page.tsx    # Homepage
│   │   │   └── quiz/
│   │   │       └── page.tsx  # AI Quiz page
│   │   ├── api/            # API routes (for future backend logic)
│   │   │   └── ...
│   │   ├── products/       # Product-related pages
│   │   │   ├── [productId]/ # Dynamic route for individual product detail pages
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx    # Product listing page
│   │   ├── layout.tsx      # Root layout for the application
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout specific components (header, footer)
│   │   │   └── Header.tsx
│   │   ├── products/       # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── ProductGrid.tsx
│   │   └── ui/             # Shadcn UI components (auto-generated/customized)
│   │       └── ...
│   ├── contexts/           # React Contexts for state management
│   │   └── AppContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useAppContext.ts
│   ├── lib/                # Utility functions, constants, types
│   │   ├── constants.ts    # Application constants (mock data, quiz questions)
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── utils.ts        # General utility functions
│   └── styles/             # Additional styling (if any, beyond global.css)
├── .gitignore              # Files and directories to ignore in Git
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration (used by Tailwind)
├── README.md               # Project README file
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── ...                     # Other configuration files (.eslintrc.json, prettierrc.json, etc.)
```

This structure promotes modularity and makes it easy to locate specific files and functionalities. Components are separated from pages, contexts manage global state, and utility functions and types are grouped in the `lib` directory.

## Key Components

Here's a brief overview of some of the key React components in the Aroma Genius application:

*   **`AppContext.tsx`**: This file defines the `AppContext` using React's Context API. It serves as a central state management solution for the application, holding the state related to products (full list, filters, sort), the shopping cart, and the AI quiz state. It also provides a combined dispatch function to update this state using a reducer pattern. This context is consumed by various components throughout the application to access and modify the shared state.
*   **`useAppContext.ts`**: A custom React hook that provides a convenient way to access the `AppContext`. This hook simplifies consuming the context in functional components, making the code cleaner and more readable.
*   **`ProductFilters.tsx`**: A client component responsible for rendering the UI elements that allow users to filter and sort the product list. It uses `useAppContext` to read the current filtering and sorting state and dispatches actions to the context to update the state when filter or sort options are changed.
*   **`ProductCard.tsx`**: A client component that displays information for a single product in a card format. It receives product data as a prop and renders the product image, name, price, and an "Add to Cart" button. It uses `useAppContext` to dispatch the `ADD_ITEM` action when the button is clicked.
*   **`ProductGrid.tsx`**: A client component that fetches the filtered and sorted product data from the `AppContext` and maps over it to render a grid of `ProductCard` components. It also handles the display of a "no products found" message when the applied filters result in an empty list.
*   **`Header.tsx`**: A layout component that serves as the application's navigation bar. It typically includes the site logo, navigation links (e.g., Home, Products, Quiz), and potentially a shopping cart icon or summary. It might use `useAppContext` to display the number of items in the cart.
*   **`src/app/(marketing)/page.tsx`**: The homepage component, typically a Server Component, introducing the Aroma Genius platform and guiding users to key sections like the product listing and the AI quiz.
*   **`src/app/(marketing)/quiz/page.tsx`**: A client component that renders and manages the flow of the AI-powered product recommendation quiz. It interacts with the `AppContext` to handle quiz state, user input, and trigger the AI recommendation process.
*   **`src/app/products/page.tsx`**: The product listing page component. It utilizes `ProductFilters` and `ProductGrid` to display the interactive product catalog. It accesses product data and filter/sort state via `useAppContext`.
*   **`src/app/products/[productId]/page.tsx`**: A dynamic route component for displaying the details of a specific product. It extracts the `productId` from the URL parameters and likely fetches the corresponding product data (from `MOCK_PRODUCTS` or a backend API) to render the detailed view.

These components work together, orchestrated by Next.js routing and React Context for state management, to deliver the Aroma Genius user experience.

## Contributing

We welcome contributions from the community! If you're interested in contributing to Aroma Genius, please follow these guidelines:

1.  **Fork the repository:** Click the "Fork" button at the top right of this page to create your own copy of the repository.
2.  **Clone your forked repository:** Clone your repository to your local machine.
    
```bash
git clone https://github.com/your-username/aroma-genius.git
```
    Replace `your-username` with your GitHub username.
3.  **Create a new branch:** Create a new branch for your feature or bug fix.
    
```bash
git checkout -b feature/your-feature-name
```
    or
    
```bash
git checkout -b bugfix/your-bug-name
```
4.  **Make your changes:** Implement your feature or fix the bug. Ensure you follow the coding style and guidelines used in the project.
5.  **Write tests (if applicable):** If your changes involve new functionality or fix a bug, please consider adding tests to ensure correctness.
6.  **Commit your changes:** Commit your changes with a clear and concise commit message.
    
```bash
git commit -m "feat: Add your feature description"
```
    or
    
```bash
git commit -m "fix: Fix your bug description"
```
7.  **Push your changes:** Push your changes to your forked repository.
    
```bash
git push origin feature/your-feature-name
```
    or
    
```bash
git push origin bugfix/your-bug-name
```
8.  **Create a Pull Request:** Go to the original Aroma Genius repository on GitHub and create a new pull request from your forked repository and branch. Provide a detailed description of your changes and the purpose of the pull request.

We will review your pull request as soon as possible. Please be patient and responsive to any feedback provided.

### Code Style

We follow standard JavaScript/TypeScript and React best practices. We recommend using Prettier and ESLint to maintain consistent code formatting and quality. Configuration files for these tools are included in the repository.

### Issues

If you find a bug or have a feature request, please open an issue on the GitHub repository. Provide as much detail as possible, including steps to reproduce the bug or a clear description of the requested feature.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue on the GitHub repository or contact the project maintainers.

Thank you for your interest in Aroma Genius! We look forward to your contributions.