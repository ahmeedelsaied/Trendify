# 🛍️ Trendify - Modern E-Commerce Interface

> **Trendify** is a fully responsive, dynamic e-commerce frontend application. It features a modern UI with glassmorphism effects, a sophisticated sliding authentication system, and real-time cart management using LocalStorage.

![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 🚀 Live Demo
### [Click here to visit Trendify Live!](https://ahmeedelsaied.github.io/Trendify/)

---

## 📸 Project Screenshots

| Home Page | Sliding Auth System |
|:---:|:---:|
| ![Home Page](./images/hero.png) | ![Auth Page](./images/auth-preview.png) |
| *Modern Hero Section & Search* | *Smooth Sign-in/Sign-up Animation* |

| Shopping Cart | Responsive Design |
|:---:|:---:|
| ![Cart Page](./images/cart-preview.png) | ![Mobile View](./images/mobile-preview.png) |
| *Dynamic Cart with Quantity Controls* | *Fully Responsive on all devices* |

> **Note:** Screenshots are stored in the `images/` folder.

---

## ✨ Key Features

### 🛒 Shopping Experience
* **Dynamic Product Rendering:** Products are loaded dynamically via JavaScript.
* **Advanced Search:** Filter products by **Name** or **Category** instantly.
* **Favorites System:** Users can mark items as favorites (persisted in LocalStorage).

### 🔐 Authentication (Frontend Logic)
* **Sliding Animation:** A unique CSS-only transition between Login and Register forms.
* **User Validation:** Simple logic to validate inputs and store user credentials locally.
* **Session Persistence:** Keeps the user logged in even after refreshing the page.

### 💼 Cart Management
* **Real-time Calculations:** Subtotal and Total prices update instantly.
* **Quantity Controls:** Increase or decrease item quantities directly from the cart.
* **Smart Indicators:** Badge on the navbar shows the number of items in the cart.
* **Empty State:** Custom illustration and message when the cart is empty.

---

## 🛠️ Technologies Used

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

---

## 📂 Project Structure

```bash
Trendify/
├── index.html          # Main Landing Page
├── html/
│   ├── auth.html       # Login/Register (Sliding Form)
│   └── cart.html       # Shopping Cart Page
├── css/
│   └── style.css       # Custom Styles & Animations
├── js/
│   └── script.js       # Core Logic (Cart, Auth, Search)
├── images/             # Product Images & Icons
└── README.md           # Documentation
