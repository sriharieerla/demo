/* ============================================================
   PRODUCT DATA
   ============================================================ */
const products = [
  {
    id: 1,
    name: "Royal Kundan Necklace",
    category: "gold",
    price: 299,
    img: "kundhn.webp",
  },
  {
    id: 2,
    name: "Silk Chiffon Gown",
    category: "fashion",
    price: 180,
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Antique Temple Bangle",
    category: "gold",
    price: 120,
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Minimalist Gold Hoops",
    category: "gold",
    price: 85,
    img: "hoops.webp",
  },
  {
    id: 5,
    name: "Pastel Summer Dress",
    category: "fashion",
    price: 95,
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Heirloom Bridal Set",
    category: "gold",
    price: 450,
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
];


/* ============================================================
   CART LOGIC
   ============================================================ */
let cart = JSON.parse(localStorage.getItem("jd_cart")) || [];

function updateCartUI() {
  const badge = document.getElementById("cart-count");
  const container = document.getElementById("cart-items-container");
  const totalEl = document.getElementById("cart-total");

  if (badge) badge.innerText = cart.reduce((acc, item) => acc + item.qty, 0);

  if (container) {
    container.innerHTML = cart.length
      ? ""
      : '<p style="text-align:center; color:#999; margin-top:50px;">Your bag is empty.</p>';

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      container.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
          <div style="flex:1;">
            <h4 style="font-size: 0.9rem; margin-bottom: 5px;">${item.name}</h4>
            <p style="color: #666; font-size: 0.8rem;">$${item.price} x ${item.qty}</p>
          </div>
          <span onclick="removeFromCart(${index})" style="color: red; cursor: pointer; font-size: 0.8rem;">Remove</span>
        </div>
      `;
    });

    if (totalEl) totalEl.innerText = "$" + total.toFixed(2);
  }
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((item) => item.id === id);

  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });

  localStorage.setItem("jd_cart", JSON.stringify(cart));
  updateCartUI();
  toggleCart(); // Automatically open cart
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("jd_cart", JSON.stringify(cart));
  updateCartUI();
}


/* ============================================================
   CART SIDEBAR TOGGLE – (FIXED FOR MOBILE)
   ============================================================ */
function toggleCart() {
  const sidebar = document.getElementById("cart-sidebar");
  const nav = document.getElementById("nav-links");

  // Toggle cart visibility
  sidebar.classList.toggle("open");

  // If cart opens → close mobile menu (if open)
  if (sidebar.classList.contains("open")) {
    nav.classList.remove("active");
    nav.classList.add("cart-open");
  } else {
    nav.classList.remove("cart-open");
  }
}


/* ============================================================
   PRODUCT RENDERING
   ============================================================ */
function createProductCard(p) {
  return `
    <div class="product-card reveal">
      <div class="product-img-box">
        <img src="${p.img}" alt="${p.name}">
        <div class="add-btn-hover" onclick="addToCart(${p.id})">Add to Bag - $${p.price}</div>
      </div>
      <div class="product-details">
        <h3>${p.name}</h3>
        <span class="price">$${p.price}</span>
      </div>
    </div>
  `;
}

function loadFeatured() {
  const grid = document.getElementById("featured-grid");
  if (grid) {
    grid.innerHTML = products.slice(0, 3).map(p => createProductCard(p)).join("");
    initObserver();
  }
}

function loadShop() {
  const grid = document.getElementById("shop-grid");
  if (grid) {
    grid.innerHTML = products.map((p) => createProductCard(p)).join("");
    initObserver();
  }
}

function filterProducts(cat) {
  const grid = document.getElementById("shop-grid");
  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);
  grid.innerHTML = filtered.map((p) => createProductCard(p)).join("");
}


/* ============================================================
   ANIMATIONS (SCROLL OBSERVER)
   ============================================================ */
function initObserver() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}


/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function toggleFaq(element) {
  element.classList.toggle("open");
  const icon = element.querySelector("i");

  if (element.classList.contains("open")) {
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-minus");
  } else {
    icon.classList.remove("fa-minus");
    icon.classList.add("fa-plus");
  }
}


/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
function toggleMobileMenu() {
  const nav = document.getElementById("nav-links");
  const icon = document.querySelector(".hamburger i");

  nav.classList.toggle("active");

  if (nav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
    icon.style.color = "#ffffff";
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    icon.style.color = "#333333";
  }
}


/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});


/* ============================================================
   INIT ON PAGE LOAD
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  initObserver();
});
