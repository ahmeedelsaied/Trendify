const products = [
  {
    id: 1,
    name: "Golden Watch",
    price: 400,
    category: "Watches",
    img: "images/p1.jpg",
  },
  {
    id: 2,
    name: "Silver Necklace",
    price: 150,
    category: "Necklace",
    img: "images/p2.avif",
  },
  {
    id: 3,
    name: "Golden Earrings",
    price: 200,
    category: "Earrings",
    img: "images/p3.avif",
  },
  {
    id: 4,
    name: "Black Watch",
    price: 350,
    category: "Watches",
    img: "images/p4.avif",
  },
  {
    id: 5,
    name: "Silver Set Rings",
    price: 580,
    category: "Rings",
    img: "images/p5.avif",
  },
  {
    id: 6,
    name: "Silver Necklace Chain",
    price: 150,
    category: "Necklace",
    img: "images/p6.avif",
  },
  {
    id: 7,
    name: "Black Bracelet",
    price: 100,
    category: "Bracelet",
    img: "images/p7.avif",
  },
  {
    id: 8,
    name: "Set Necklace",
    price: 500,
    category: "Necklace",
    img: "images/p8.avif",
  },
  {
    id: 9,
    name: "Golden Set Bracelet",
    price: 300,
    category: "Bracelet",
    img: "images/p9.avif",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.addEventListener("DOMContentLoaded", () => {
  // Auth Logic
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");
  const btnRegister = document.getElementById("btn-register");
  const btnLogin = document.getElementById("btn-login");

  if (signUpButton && signInButton && container) {
    signUpButton.addEventListener("click", () =>
      container.classList.add("right-panel-active"),
    );
    signInButton.addEventListener("click", () =>
      container.classList.remove("right-panel-active"),
    );
  }

  if (btnRegister) {
    btnRegister.addEventListener("click", (e) => {
      e.preventDefault();
      const first = document.getElementById("reg-first").value.trim();
      const last = document.getElementById("reg-last").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const pass = document.getElementById("reg-pass").value.trim();

      if (first && last && email && pass) {
        localStorage.setItem("firstName", first);
        localStorage.setItem("lastName", last);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPass", pass);
        alert("Account Created Successfully!");
        setTimeout(() => {
          if (container) container.classList.remove("right-panel-active");
        }, 1500);
      } else {
        alert("Please fill all fields.");
      }
    });
  }

  if (btnLogin) {
    btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("login-email").value.trim();
      const passInput = document.getElementById("login-pass").value.trim();
      const storedEmail = localStorage.getItem("userEmail");
      const storedPass = localStorage.getItem("userPass");

      if (emailInput && passInput) {
        if (emailInput === storedEmail && passInput === storedPass) {
          window.location.href = "../index.html";
        } else {
          alert("Invalid Email or Password!");
        }
      } else {
        alert("Please enter email and password.");
      }
    });
  }

  // Main Logic
  updateCartCount();
  checkAuth();
  if (document.getElementById("products-container")) {
    drawProducts(products);
    setupSearch();
  } else if (document.getElementById("cart-page-items")) {
    drawCartPage();
    drawFavoritesSection();
  }
});

function drawProducts(items) {
  const container = document.getElementById("products-container");
  container.innerHTML = items
    .map((p) => {
      const inCart = cart.some((item) => item.id === p.id);
      const btnClass = inCart ? "btn-remove" : "btn-add";
      const btnText = inCart ? "Remove from Cart" : "Add to Cart";
      const btnAction = inCart
        ? `removeFromCart(${p.id})`
        : `addToCart(${p.id})`;
      const isFav = favorites.includes(p.id);
      const heartClass = isFav ? "fas fa-heart active" : "far fa-heart";

      return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div class="product-card h-100 p-3">
                <div class="img-container mb-3">
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <h5 class="fw-bold">${p.name}</h5>
                <p class="text-muted small">Category: ${p.category}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="card-price">$${p.price}</span>
                    <i class="${heartClass} fav-icon" onclick="toggleFav(${p.id})"></i>
                </div>
                <button class="btn ${btnClass} w-100 rounded-pill mt-3 py-2" onclick="${btnAction}">${btnText}</button>
            </div>
        </div>`;
    })
    .join("");
}

function addToCart(id) {
  if (!localStorage.getItem("firstName")) {
    alert("Please Login First!");
    window.location.href = "html/auth.html";
    return;
  }
  const product = products.find((p) => p.id === id);
  cart.push({ ...product, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  if (document.getElementById("products-container")) drawProducts(products);
  if (document.getElementById("cart-page-items")) drawCartPage();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  if (document.getElementById("products-container")) drawProducts(products);
  if (document.getElementById("cart-page-items")) drawCartPage();
}

function changeQty(id, action) {
  const item = cart.find((i) => i.id === id);
  if (action === 1) item.qty++;
  else if (item.qty > 1) item.qty--;
  localStorage.setItem("cart", JSON.stringify(cart));
  drawCartPage();
}

function drawCartPage() {
  const container = document.getElementById("cart-page-items");
  const subtotalEl = document.getElementById("summary-subtotal");
  const totalEl = document.getElementById("summary-total");
  const userNameDisplay = document.getElementById("user-name");
   const firstName = localStorage.getItem("firstName");
   const lastName = localStorage.getItem("lastName");
   if (userNameDisplay) userNameDisplay.innerText = `${firstName} ${lastName || ""}`;
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="text-center py-5 bg-white rounded-4 shadow-sm"><img src="../images/empty-cart.png" width="200"><h4 class="mt-3">Your Cart is Empty</h4><a href="../index.html" class="btn btn-dark rounded-pill px-5 mt-3">Go Shopping</a></div>`;
    if (subtotalEl) subtotalEl.innerText = "$0.00";
    if (totalEl) totalEl.innerText = "$0.00";
    return;
  }

  let total = 0;
  container.innerHTML = cart
    .map((item) => {
      total += item.price * item.qty;
      let imgPath = item.img;
      if (!imgPath.startsWith("http")) imgPath = "../" + item.img; // مسار الصورة المصحح

      return `
        <div class="cart-item-card d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">
            <div class="cart-img-wrapper"><img src="${imgPath}" alt="${item.name}"></div>
            <div class="flex-grow-1">
                <h5 class="fw-bold mb-1">${item.name}</h5>
                <p class="text-muted small mb-0">Category: ${item.category}</p>
                <p class="text-primary fw-bold mt-1">$${item.price}</p>
            </div>
            <div class="qty-control-group mx-auto mx-md-0">
                <button class="btn-qty" onclick="changeQty(${item.id}, -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button class="btn-remove-icon ms-md-3" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
        </div>`;
    })
    .join("");

  if (subtotalEl) subtotalEl.innerText = `$${total.toFixed(2)}`;
  if (totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}

function setupSearch() {
  const input = document.getElementById("search-input");
  const select = document.getElementById("search-type");
  const btn = document.getElementById("search-btn");
  function filterProducts() {
    const val = input.value.toLowerCase();
    const type = select.value;
    const filtered = products.filter((p) =>
      type === "name"
        ? p.name.toLowerCase().includes(val)
        : p.category.toLowerCase().includes(val),
    );
    drawProducts(filtered);
  }
  if (btn) btn.addEventListener("click", filterProducts);
  if (input) input.addEventListener("input", filterProducts);
}

function toggleFav(id) {
  if (favorites.includes(id))
    favorites = favorites.filter((favId) => favId !== id);
  else favorites.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  if (document.getElementById("products-container")) drawProducts(products);
  if (document.getElementById("fav-items-container")) drawFavoritesSection();
}

function drawFavoritesSection() {
  const container = document.getElementById("fav-items-container");
  if (!container) return;
  if (favorites.length === 0) {
    container.innerHTML =
      "<p class='text-muted text-center w-100'>No items saved yet.</p>";
    return;
  }
  const favItems = products.filter((p) => favorites.includes(p.id));
  container.innerHTML = favItems
    .map(
      (p) => `
        <div class="col-6 col-md-3"><div class="card p-3 border-0 shadow-sm h-100 text-center">
            <img src="../${p.img}" class="img-fluid mb-2" style="height: 100px; object-fit: contain;">
            <h6 class="fw-bold small">${p.name}</h6>
            <div class="mt-auto"><button class="btn btn-sm btn-outline-dark rounded-pill" onclick="addToCart(${p.id})">Add</button>
            <button class="btn btn-sm btn-link text-danger" onclick="toggleFav(${p.id})"><i class="fas fa-trash"></i></button></div>
        </div></div>`,
    )
    .join("");
}

function checkAuth() {
  const userArea = document.getElementById("user-area");
  const authLinks = document.getElementById("auth-links");
  const userNameDisplay = document.getElementById("user-name");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  if (firstName) {
    if (authLinks) authLinks.style.display = "none";
    if (userArea) {
      userArea.style.display = "flex";
      userNameDisplay.innerText = `${firstName} ${lastName || ""}`;
    }
  } else {
    if (authLinks) authLinks.style.display = "block";
    if (userArea) userArea.style.display = "none";
  }
}
function updateCartCount() {
  const badge = document.getElementById("cart-badge");
  if (badge) badge.innerText = cart.length;
}
function logout() {
  localStorage.clear();
  window.location.href = "../index.html";
}
