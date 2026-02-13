const user = document.querySelector("#user-info");
const links = document.querySelectorAll("#auth-buttons");
const info = document.querySelector(".info");
const header = document.querySelector(".header");

if (localStorage.getItem("email")) {
  user.innerHTML = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}!`;
  info.style.display = "block";
  links.forEach((link) => {
    link.style.display = "none";
  });
  header.style.display = "none";
}

// 1. Data Source (Products Array)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 150,
    img: "https://i.pinimg.com/564x/4e/03/6e/4e036e52292027e4df73456346263595.jpg",
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    price: 299,
    img: "https://i.pinimg.com/564x/f3/04/e9/f304e94326079c09939a04456565451e.jpg",
  },
  {
    id: 3,
    name: "Nike Air Jordan",
    price: 180,
    img: "https://i.pinimg.com/564x/a4/0c/36/a40c36b6d51020054700d234c9c614c5.jpg",
  },
  {
    id: 4,
    name: "Casual Backpack",
    price: 45,
    img: "https://i.pinimg.com/564x/a9/3c/b4/a93cb4e9d0e2c453818e3a24209426f8.jpg",
  },
  {
    id: 5,
    name: "RayBan Sunglasses",
    price: 120,
    img: "https://i.pinimg.com/564x/3b/22/e3/3b22e336214371725656910629476837.jpg",
  },
  {
    id: 6,
    name: "Canon DSLR Camera",
    price: 850,
    img: "https://i.pinimg.com/564x/b8/06/66/b806660f992d9f783307567705139266.jpg",
  },
  {
    id: 7,
    name: "Modern Desk Lamp",
    price: 35,
    img: "https://i.pinimg.com/564x/de/5c/41/de5c4149800a35920786e680562634d0.jpg",
  },
  {
    id: 8,
    name: "Gaming Controller",
    price: 60,
    img: "https://i.pinimg.com/564x/b2/ec/64/b2ec64704e67272714c16f2726597813.jpg",
  },
];

// Cart State
let cart = [];

// DOM Elements
const productsContainer = document.getElementById("products-container");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartBadge = document.getElementById("cart-badge");
const searchInput = document.getElementById("search-input");
const userNameElement = document.getElementById("user-name");

// 2. Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Load User Name
  loadUserData();
  // Render All Products Initially
  renderProducts(products);
});

// Load User Data from LocalStorage
function loadUserData() {
  // Check if data exists, if not set defaults for testing
  if (!localStorage.getItem("firstName")) {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
  }
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");


  if (firstName && lastName) {
    userNameElement.innerText = `${firstName} ${lastName}`;
  }
}

// 3. Render Products Function
function renderProducts(items) {
    productsContainer.innerHTML = items.map(product => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card product-card h-100">
                
                <div class="img-container">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold" style="font-size: 1rem;">${product.name}</h5>
                    <p class="card-text text-muted mb-3">$${product.price}</p>
                    
                    <div class="d-flex gap-2 mt-auto">
                        <button class="btn btn-gradient text-white fw-bold flex-grow-1 rounded-pill" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                        
                        <button class="btn btn-outline-danger rounded-circle p-2" style="width: 40px; height: 40px;" onclick="toggleFav(this)">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `).join('');
}
// 4. Search Functionality
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm),
  );
  renderProducts(filteredProducts);
});

// 5. Cart Logic
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  cart.push(product);
  updateCartUI();

  // Open Sidebar Automatically (Optional)
  const offcanvasElement = document.getElementById("cartOffcanvas");
  const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
  bsOffcanvas.show();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  // Update Badge
  cartBadge.innerText = cart.length;

  // Calculate Total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalElement.innerText = `$${total.toFixed(2)}`;

  // Update Sidebar List
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="text-center text-muted mt-5">
                <i class="fas fa-shopping-basket fa-3x mb-3"></i>
                <p>Your cart is empty</p>
            </div>
        `;
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
            <div class="d-flex align-items-center mb-3 p-2 border-bottom">
                <img src="${item.img}" class="rounded" width="50" height="50" style="object-fit: cover;">
                <div class="ms-3 flex-grow-1">
                    <h6 class="mb-0 fs-6 fw-bold">${item.name}</h6>
                    <small class="text-muted">$${item.price}</small>
                </div>
                <button class="btn btn-sm text-danger" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `,
      )
      .join("");
  }
}

// 6. Favorite Toggle
function toggleFav(btn) {
  btn.classList.toggle("active");
}

