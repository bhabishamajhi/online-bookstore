# 📚 Online Bookstore (MERN Stack Application)

## 🌐 Live Demo

- **Frontend:** https://online-bookstore-4azmd5jc0-bhabishamajhis-projects.vercel.app
- **Backend API:** https://online-bookstore-uwqb.onrender.com/api

---

## 📖 Project Overview

The **Online Bookstore** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

This application allows users to browse books, search and filter them, and manage a shopping cart. It also includes an admin panel for managing books.

---

## 🎯 Features

### 👤 User Features

- Browse books in grid layout
- Search books by title or author
- Filter books by category
- Add books to cart
- Increase / decrease quantity
- Remove items from cart
- View total price dynamically

### 🛠️ Admin Features

- Add new books
- Edit existing books
- Delete books
- Manage stock and pricing
- Basic admin authentication

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Bootstrap / Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB (Atlas / Local)

### Deployment

- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

online-bookstore/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── api.js
│
└── README.md

---

## ⚙️ Installation and Setup

### 1. Clone Repository

git clone https://github.com/bhabishamajhi/online-bookstore.git

cd online-bookstore

### 2. Setup Backend

cd backend
npm install

Run backend:
npm start

### 3. Setup Frontend

cd frontend
npm install
npm start

---

## 🔗 API Endpoints

### Books

- GET `/api/books` → Get all books

### Cart

- GET `/api/cart/:userId` → Get cart
- POST `/api/cart` → Add or update item
- POST `/api/cart/remove` → Remove item
- DELETE `/api/cart/:userId` → Clear cart

---

## 🔑 Authentication

No login required.

Default user:
userId: default-user


---

## ⚠️ Known Issues

- Cart may show old data if database is not cleared  
- No advanced authentication system  
- UI design can be improved  

---

## 🚀 Future Improvements

- Add JWT authentication  
- Payment integration  
- Order management system  
- Wishlist feature  
- Improve UI/UX  

---

## 👩‍💻 Author

**Bhabisha Majhi**  
Computer Science Student  

---

## 📜 License

This project is for educational purposes only.
