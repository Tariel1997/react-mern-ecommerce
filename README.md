# 🛒 MERN E-Commerce Store

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

Welcome to the **MERN E-Commerce Store**! 🌟 This is a full-stack e-commerce web application built using the powerful MERN stack (MongoDB, Express.js, React, Node.js). It offers a seamless shopping experience for users and an easy-to-use, feature-rich dashboard for administrators.

---

## 🚀 Features

### 👤 For Users:

- **Authentication & Authorization**: Secure login and registration using JWT and HTTP-only cookies (Access & Refresh Tokens). 🔐
- **Browse & Search Products**: Easily find products, filter by categories, and view detailed product pages. 🔍
- **Shopping Cart**: Add, remove, and update quantities of items in the cart. 🛍️
- **Secure Checkout**: Seamless and secure payment processing integrated with **Stripe**. 💳
- **Animations**: Silky smooth interactions and transitions powered by **Framer Motion**. ✨
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices natively using **Tailwind CSS**. 📱

### 👨‍💼 For Administrators:

- **Admin Dashboard**: Comprehensive overview with real-time analytics and charts powered by **Recharts**. 📊
- **Product Management**: Create, update, and delete products easily. 📝
- **Image Uploads**: Integrated with **Cloudinary** for fast and optimized product image hosting. 🖼️

---

## 🛠️ Technology Stack

### 🎨 Frontend

- **React 18** (built with Vite ⚡)
- **Tailwind CSS** for rapid and modern styling
- **Zustand** for lightweight and fast global state management
- **React Router DOM** for routing
- **Framer Motion** for beautiful micro-animations
- **Axios** for API requests

### ⚙️ Backend

- **Node.js** & **Express.js** for the REST API
- **MongoDB** & **Mongoose** for the database
- **Redis** (`ioredis`) for robust caching to boost performance 🚀
- **JWT** (JSON Web Tokens) for authentication
- **Bcrypt.js** for password hashing
- **Stripe API** for secure payments processing
- **Cloudinary** for cloud image storage

---

## 🏁 Getting Started

Follow these instructions to set up the project locally on your machine.

### 📋 Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Redis](https://redis.io/) (for caching)

### 💻 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Tariel1997/react-mern-ecommerce.git
   cd react-mern-ecommerce
   ```

2. **Install all dependencies:**
   _(Install backend dependencies)_

   ```bash
   npm install
   ```

   _(Install frontend dependencies)_

   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory based on the provided `.env.example` and fill in your credentials:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   UPSTASH_REDIS_URL=your_redis_url
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Run the Application locally:**
   Start the backend and frontend development servers.

   ```bash
   npm run dev
   ```

   _And in a separate terminal for the frontend:_

   ```bash
   cd frontend
   npm run dev
   ```

5. **Build and Run for Production:**
   If you want to run the app in production mode with the built frontend assets:
   ```bash
   npm run build
   npm start
   ```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 🛠️
