# 🌿 LeafyLife - A Gardening Lover’s Platform

**Live Site:** [🌐 Visit LeafyLife](https://leafylife-green.web.app/)

**Client Repo:** [GitHub - LeafyLife Client](https://github.com/IFTI-KAR/LeafyLife-client-side-A-gardening-lover-s-platform-)

**Server Repo:** [GitHub - LeafyLife Server](https://github.com/IFTI-KAR/LeafyLife-server-side-A-gardening-lover-s-platform)

---

## 🌱 Project Overview

**LeafyLife** is a community-driven gardening platform that connects gardeners across the globe. Users can:

* ✍️ Share their best gardening tips
* 📚 Browse and like public gardening advice
* 🧑‍🌾 Explore top and featured gardeners
* 📾 Manage their own shared tips privately
* 🌐 Enjoy a smooth and responsive user experience with light/dark modes

---

## 🧹 Tech Stack

### 👥 Client Side

* **React** (with JSX components)
* **React Router DOM v6**
* **Tailwind CSS** (fully responsive and theme-ready)
* **Framer Motion** (animations)
* **React Icons**

### 🔥 Backend & Services

* **Node.js + Express.js**
* **MongoDB Atlas** (with Mongoose)
* **Firebase Auth** (email/password authentication)
* **CORS**, **dotenv**, **MongoDB Driver**

---

## 🧻 Features

### ✅ Public Features

* 🌼 Home, Why Choose Us, Reviews
* 🌱 Browse Gardening Tips (only public)
* 🔍 Explore Gardeners (active ones shown as “Featured”)

### 🔐 Authenticated Features

* 🔒 Login & Register via Firebase
* ✍️ Share Garden Tips
* 🗃️ View "My Tips"
* 💠 Update or Delete Own Tips
* ❤️ Like Tips (with trending logic)
* 🧑 View Tip Details (including likes, author, time)

---

## 🔐 Authentication

* Firebase-based email/password auth
* `PrivateRoute` component to guard pages like:

  * Share Tip
  * Tip Details
  * My Tips
  * Update Tip

---

## 📁 Project Structure

### Client (`LeafyLife-client-side-A-gardening-lover-s-platform`)

```
src/
💁 assets/                  # Static files (images, icons, etc.)
📄 components/              # Reusable UI components
📝 pages/                   # Page-level views
📃📝 Login, Register
📃📝 BrowseTips, TipDetails, MyTips
📃📝 ShareGardenTips, UpdateTip
📃📝 ExploreGardeners, Featured
📃📝 Home, Footer, Header, Banner
📃📝 Error.jsx
💼 layouts/                 # Layout wrappers
📑 MainLayout.jsx, AuthLayout.jsx
📈 provider/                # Context providers and route protection
💡 AuthProvider.jsx, PrivateRoute.jsx
```

---

## 🌿 Server-Side API Endpoints

### 👨‍🌾 Gardener Routes

* `GET /gardeners/featured` → 6 Active Gardeners
* `GET /gardeners` → All Gardeners
* `POST /gardeners` → Add New Gardener (with email uniqueness)

### 💡 Tips Routes

* `GET /tips` → All Public Tips
* `GET /tips/trending` → 6 Popular Tips
* `GET /tips/user?email=...` → My Tips (by email)
* `GET /tips/:id` → Tip Details
* `POST /tips` → Submit New Tip
* `PATCH /tips/:id` → Update Tip
* `PATCH /tips/like/:id` → Like Tip (increment)
* `DELETE /tips/:id` → Delete Tip



---

## 🚀 Local Development

### Clone Repos

```bash
git clone https://github.com/IFTI-KAR/LeafyLife-client-side-A-gardening-lover-s-platform-
git clone https://github.com/IFTI-KAR/LeafyLife-server-side-A-gardening-lover-s-platform
```

### Client Setup

```bash
cd LeafyLife-client-side-A-gardening-lover-s-platform-
npm install
npm run dev
```

### Server Setup

```bash
cd LeafyLife-server-side-A-gardening-lover-s-platform
npm install
npm run start
```

---

## ✍️ Author

**IFTIKAR RAHAMAN**
🌱 Passionate Web Developer | Building creative web experiences for nature and humans alike

---
