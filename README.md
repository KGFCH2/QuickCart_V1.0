# 🛒 QuickCart V1.0 - Premium Marketplace

QuickCart is a high-performance, full-featured e-commerce platform built for the modern digital silhouette. Designed with a focus on elite user experience, it combines bespoke boutique aesthetics with next-gen functionality including built-in shopping intelligence and real-time logistics tracking.

## 🚀 Key Features

- **👗 Multi-Category Boutique:** Seamlessly browse through Men's Wear, Women's Wear, Electronics, Horology (Watches), Grocery, Home, and more.
- **🤖 QuickCart Concierge:** Built-in intelligent shopping assistant for personalized product recommendations.
- **🚚 Live Logistics Tracking:** Real-time monitoring of order status from fulfillment to arrival.
- **💳 Express Checkout:** Secure payment workflows supporting UPI and Cash on Delivery with automated PDF receipts.
- **💖 Dynamic Wishlist:** High-interactivity favorites list to curate your acquisitions.

## 🛠️ Technology Stack

- **💻 Frontend:** React 19 (ESM based), Tailwind CSS 3.
- **🎨 Icons:** Lucide React.
- **📄 Logistics Engine:** jsPDF for receipts.
- **🗄️ Persistence:** Browser Local Storage.

## 📦 Contact & Hub

- **📍 Operational Hub:** Howrah, West Bengal - 711202, India.
- **📧 Email:** babinbid05@gmail.com
- **📞 Priority Line:** 9123777679

---

## Quick Start 🚀

These instructions get you a local copy up and running for development and testing.

### Prerequisites 🧰

- 🟢 Node.js 18+ (LTS recommended)
- 📦 npm (or use `pnpm` / `yarn` if you prefer)

### Install 💾

Clone the repo and install dependencies:

```bash
git clone <repo-url> quickcart
cd quickcart
npm install
```

### Development 🛠️

Start the Vite development server (hot reload):

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build & Preview 📦

Create a production build and preview it locally:

```bash
npm run build
npm run preview
```

## Project Structure 🗂️

- `index.html` — Vite entry
- `index.tsx`, `App.tsx` — React app root and routing
- `pages/` — Page-level components (Home, Shop, Cart, Admin, etc.)
- `services/` — API helpers, data store, logistics utilities
- `types.ts` — Shared TypeScript types
- `db.ts` — Lightweight local persistence helpers
- `vite.config.ts`, `tsconfig.json` — Build and TS configuration

## Configuration & Environment ⚙️

This project uses no external runtime environment variables by default. If you add third-party APIs (payments, analytics, genAI), add a `.env` file and update `vite.config.ts` accordingly.

## Features ✨

- 🧾 Curated product categories and boutique-style UI
- 🤖 Built-in QuickCart Concierge (assistant knowledge base)
- 🚚 Live-ish logistics tracking + PDF receipts via `jspdf`
- 📱 Mobile-first responsive layouts (Tailwind CSS)

## Contributing 🤝

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Commit your changes: `git commit -m "feat: add my feature"`.
4. Push to your branch and open a Pull Request.

Please keep changes minimal and focused; include screenshots or short recordings for UI changes.

## Testing & Quality ✅

There are no automated tests included in this initial layout. Before submitting UI changes, please perform a manual smoke test across desktop and mobile breakpoints.

## Deployment 🚀

This is a static frontend built with Vite — deploy to Netlify, Vercel, or any static hosting that supports SPA routing. Make sure to enable rewrites to `index.html` for client-side routing.

## Maintainer & Contact 📬

- Maintainer: babinbid05 (email: babinbid05@gmail.com)

---