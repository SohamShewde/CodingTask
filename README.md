# 🏬 Store Rating & Management System

## 📌 Project Overview

This is a **full-stack web application** that allows users to explore stores, submit ratings, and enables owners/admins to manage stores and view analytics.

The system is built using:

* **Frontend:** React.js (with Tailwind CSS)
* **Backend:** Node.js + Express.js
* **Database:** MySQL

---

## 👥 User Roles

### 👤 User

* View all stores
* Search stores
* Rate stores (1–5 ⭐)
* Update password

### 🏪 Owner

* View own stores
* See average ratings
* View customer reviews
* Update password

### 🛠 Admin

* Manage users (add/view)
* Manage stores (add/view)
* View system dashboard stats

---

## ⚙️ Features

* 🔐 Authentication (Login/Signup)
* 🔑 Role-based access (Admin / User / Owner)
* ⭐ Store rating system
* 🔍 Search functionality
* 📊 Dashboard analytics
* 🔒 Password update with validation
* 🎨 Responsive UI with Tailwind CSS

---

## 🔄 Workflow

### 1️⃣ Authentication

* User logs in → Token + Role stored in localStorage
* Role-based routing is applied using Private routes

---

### 2️⃣ User Flow

1. Login as User
2. Redirect to **User Store Page**
3. Search stores
4. Rate stores
5. Update password if needed

---

### 3️⃣ Owner Flow

1. Login as Owner
2. Redirect to **Owner Dashboard**
3. View:

   * Total stores
   * Average ratings
   * Reviews from users
4. Update password

---

### 4️⃣ Admin Flow

1. Login as Admin
2. Access dashboard
3. Manage:

   * Users
   * Stores
4. Monitor system stats

---

### 5️⃣ Password Update Flow

1. User clicks **Change Password**
2. Enters new password + confirm password
3. Validation applied:

   * 8–16 characters
   * At least 1 uppercase letter
   * At least 1 special character
4. Password updated in database
5. Redirect based on role:

   * User → `/user/stores`
   * Owner → `/owner/dashboard`
   * Admin → `/admin/dashboard`

---

## 🗄 Database Structure (Simplified)

### Users Table

* id
* name
* email
* password
* role (ADMIN / USER / OWNER)

### Stores Table

* id
* name
* address
* ownerCode

### Ratings Table

* id
* userId
* storeId
* rating

---

## 🚀 Installation & Setup

```bash
# Clone repo
git clone https://github.com/your-username/your-repo.git

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install

# Run backend
npm start

# Run frontend
npm run dev
```

---

## 📡 API Endpoints (Sample)

### Auth

* POST `/auth/login`
* POST `/auth/signup`
* PUT `/auth/update-password`

### User

* GET `/user/stores`
* POST `/user/rate`

### Owner

* GET `/owner/dashboard/:code`

### Admin

* GET `/admin/dashboard`
* POST `/admin/add-user`
* POST `/admin/add-store`

---

## 🧠 Key Concepts Used

* React Hooks (useState, useEffect)
* Role-based Routing
* REST APIs
* JWT Authentication
* MySQL Queries
* Component-based UI

---



---

 Author

**Soham Shewde**

