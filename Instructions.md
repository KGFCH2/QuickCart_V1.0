# 📜 Project Instructions & File Documentation

This document provides a detailed breakdown of the QuickCart V1.0 architecture.

## 🏗️ System Architecture

QuickCart follows a modular React architecture where global state is managed through `AppContext`. The persistence layer is simulated via a data store that interacts with a localized database (`db.ts`).

## 📂 File Directory Breakdown

### ⚙️ Core Configuration
- **`index.html`**: HTML entry point that loads the React app, includes global styles, and sets up the basic page structure with meta tags, title, and links to CSS/JS bundles.
- **`index.tsx`**: Mounts the React app to the DOM element with id 'root', includes providers for routing (HashRouter) and global context (AppContext).
- **`types.ts`**: Defines TypeScript interfaces and enums for the app, including User, Product, Order, CartItem, ProductCategory, OrderStatus, UserRole, and DashboardStats.
- **`package.json`**: Defines project dependencies (React, Vite, Lucide icons, jsPDF, etc.), scripts (dev, build, preview), and metadata for the Node.js project.
- **`tsconfig.json`**: TypeScript configuration for compilation settings, including target ES2022, JSX support, and path aliases.
- **`vite.config.ts`**: Vite build tool configuration, including server settings (port 3000), React plugin, and environment variables for API keys.
- **`metadata.json`**: App metadata for VS Code extension or similar, with name, description, and camera permissions.
- **`README.md`**: Project documentation with description, features (multi-category boutique, AI concierge, logistics tracking), tech stack (React, Tailwind, localStorage), and contact info.

### 💾 Data & Services
- **`db.ts`**: Provides functions to get and save data to localStorage, simulating a database with users, products, orders, and currentUser. Includes initial data for products across categories like fashion, electronics, home, etc.
- **`services/dataStore.ts`**: Contains the core business logic for authentication (login, register, logout, getCurrentUser), product management (getProducts by category, getProductById), and order management (placeOrder with stock updates, getOrders, getOrderById).
- **`services/api.ts`**: Provides API-like functions with simulated delays for authentication, product retrieval, and order management, interacting with the local database via getDB and saveDB.
- **`services/logistics.ts`**: Generates PDF receipts for orders using jsPDF, calculating subtotals, taxes (12%), shipping (free over ₹1500), and formatting the receipt with order details, items, and company info.

### 📦 Main Application
- **`App.tsx`**: The main app component that sets up routing with React Router (HashRouter), includes a responsive navigation bar, footer with modals for support/help, and renders different pages based on routes. Manages global state with AppContext for user, cart, wishlist, and layout controls.

### 🖼️ Views & Pages
- **`pages/Home.tsx`**: The home page component displaying a hero slideshow with rotating images, category cards for product categories, a trust/metrics section, FAQ support hub with expandable questions, and watch redirections for men's/women's watches. Handles user interactions like navigating to shop categories and showing assistant knowledge base.
- **`pages/Shop.tsx`**: The shop page component that displays products in a responsive grid, with filtering by category, search functionality with autocomplete suggestions, and quick view modals for product details. Allows adding to cart, toggling wishlist, and viewing product info.
- **`pages/Cart.tsx`**: Manages the shopping cart, displaying added items with quantities, prices, and totals. Allows updating quantities, removing items, and proceeding to checkout.
- **`pages/Checkout.tsx`**: Handles the checkout process, collecting shipping address, displaying order summary, and simulating payment processing to place orders.
- **`pages/OrderHistory.tsx`**: Displays user's order history with order details, status tracking, and options to view receipts or track shipments.
- **`pages/Wishlist.tsx`**: Shows saved favorite products in a grid, allowing removal from wishlist or adding to cart.
- **`pages/Profile.tsx`**: User profile page for account management, displaying user info and possibly order history or settings.
- **`pages/Auth.tsx`**: Authentication page for user login and registration, with form validation and error handling.
- **`pages/Admin.tsx`**: Placeholder component for administrative functionality, currently not implemented (returns null).