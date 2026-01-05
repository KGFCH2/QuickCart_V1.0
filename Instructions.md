# 📜 Project Instructions & File Documentation

This document provides a detailed breakdown of the QuickCart V1.0 architecture.

## 🏗️ System Architecture

QuickCart follows a modular React architecture where global state is managed through `AppContext`. The persistence layer is simulated via a data store that interacts with a localized database (`db.ts`).

## 📂 File Directory Breakdown

### ⚙️ Core Configuration
- **`index.html`**: Entry point and global styles.
- **`index.tsx`**: React mount logic.
- **`types.ts`**: Customer-focused type definitions.

### 💾 Data & Services
- **`db.ts`**: Localized product and user database.
- **`services/dataStore.ts`**: Core business logic for auth, products, and orders.
- **`services/gemini.ts`**: Simulated AI concierge logic.
- **`services/logistics.ts`**: PDF receipt generator.

### 📦 Main Application
- **`App.tsx`**: Routing and global layout.

### 🖼️ Views & Pages
- **`pages/Home.tsx`**: Landing experience.
- **`pages/Shop.tsx`**: Main catalog.
- **`pages/Cart.tsx`**: Bag management.
- **`pages/Checkout.tsx`**: Secure payment gate.
- **`pages/OrderHistory.tsx`**: Logistics hub.
- **`pages/Wishlist.tsx`**: Saved favorites.
- **`pages/Profile.tsx`**: User dashboard.
- **`pages/Auth.tsx`**: Secure sign-in portal.