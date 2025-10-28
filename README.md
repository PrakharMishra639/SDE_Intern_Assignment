# E-Commerce Web Application

A modern and responsive e-commerce web application built with **React**, **Vite**, **Redux Toolkit**, **Tailwind CSS**, and **shadcn/ui** — featuring product browsing, cart management, checkout flow, and confirmation screens with smooth UX and robust error handling.

---

## Live Demo

🔗 **Live URL:** [sde-intern-assignment-fkx7.vercel.app](sde-intern-assignment-fkx7.vercel.app)

---

## Overview

This single-page application offers a complete shopping experience:

- Browse and search for products
- Filter items by category
- Add, update, or remove products in cart
- Proceed to checkout with form validation
- View order confirmation with a unique order ID

The project follows clean component structure, optimized state management, and persistent local storage for the cart.

---

## Features

- **Product Listing** with search & category filters
- **Product Details** page (`/product/:id`)
- **Shopping Cart** (add, update quantity, remove, clear all)
- **Checkout Flow** with validation and order confirmation
- **LocalStorage Caching** for cart and product data
- **Redux Toolkit** for global state management
- **Toast Notifications** via `sonner`
- **Skeleton & Loader Components** for improved UX
- **404 Not Found Page** with consistent design

---

## Tech Stack

- **Frontend:** React (Vite) + React Router v7
- **UI:** Tailwind CSS, shadcn/ui, Lucide Icons
- **State Management:** Redux Toolkit
- **Notifications:** Sonner
- **API:** [FakeStoreAPI](https://fakestoreapi.com) for mock product data

---

## Project Structure

ecommerce/
├── public/
├── src/
│ ├── components/
│ │ ├── CartItem.jsx
│ │ ├── CategoryDropdown.jsx
│ │ ├── Footer.jsx
│ │ ├── Header.jsx
│ │ ├── Loader.jsx
│ │ ├── Pagination.jsx
│ │ ├── ProductCard.jsx
│ │ ├── ProductSkeleton.jsx
│ │ └── ui/
│ │ └── skeleton.jsx
│
│ ├── hooks/
│ │ ├── useCart.js
│ │ └── useProducts.js
│
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── ProductDetail.jsx
│ │ ├── Cart.jsx
│ │ ├── Checkout.jsx
│ │ ├── Confirmation.jsx
│ │ └── NotFound.jsx
│
│ ├── redux/
│ │ ├── cartSlice.js
│ │ ├── productsSlice.js
│ │ └── store.js
│
│ ├── utils/
│ │ └── formatCurrency.js
│
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md

---

## Routes

| Path            | Description              |
| --------------- | ------------------------ |
| `/`             | Home page (all products) |
| `/product/:id`  | Product details page     |
| `/cart`         | Shopping cart            |
| `/checkout`     | Checkout form            |
| `/confirmation` | Order confirmation page  |
| `*`             | 404 Not Found page       |

---

## Setup & Run Locally

```bash
# Clone repository
git clone https://github.com/PrakharMishra639/SDE_Intern_Assignment
cd ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```
