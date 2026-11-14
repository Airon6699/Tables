
const products = document.querySelectorAll(".product-card");
const filters = document.querySelectorAll(".filter");
const searchInput = document.querySelector("#searchInput");

const cart = [];
const cartPanel = document.querySelector("#cartPanel");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");

const loader = document.querySelector("#loader");
const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector(".nav");

let activeFilter = "All";

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 500);
    }, 700);
});

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(item => item.classList.remove("active"));
        filter.classList.add("active");

        activeFilter = filter.dataset.filter;
        filterProducts();
    });
});

searchInput.addEventListener("input", filterProducts);

function filterProducts() {
    const search = searchInput.value.toLowerCase();

    products.forEach(product => {
        const name = product.dataset.name.toLowerCase();
        const category = product.dataset.category;

        const matchesSearch = name.includes(search);
        const matchesFilter = activeFilter === "All" || category === activeFilter;

        product.classList.toggle("hidden", !(matchesSearch && matchesFilter));
    });
}

document.querySelectorAll(".category-card").forEach(category => {
    category.addEventListener("click", () => {
        activeFilter = category.dataset.category;

        filters.forEach(filter => {
            filter.classList.toggle("active", filter.dataset.filter === activeFilter);
        });

        filterProducts();

        document.querySelector("#products").scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.querySelectorAll(".favorite").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");

        const icon = button.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
    });
});

document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
        const product = button.closest(".product-card");

        const name = product.dataset.name;
        const price = Number(product.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }

        updateCart();

        button.innerHTML = "Added ✓";

        setTimeout(() => {
            button.innerHTML = 'Add to Cart <i class="fa-solid fa-plus"></i>';
        }, 1000);
    });
});

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} × ${item.quantity}</p>
                </div>
                <button onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartCount.textContent = count;
    cartTotal.textContent = "$" + total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCart() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}

document.querySelector("#cartBtn").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

document.querySelector("#searchBtn").addEventListener("click", () => {
    document.querySelector("#products").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => searchInput.focus(), 500);
});

document.querySelector("#subscribeForm").addEventListener("submit", event => {
    event.preventDefault();

    const email = document.querySelector("#emailInput").value;
    const message = document.querySelector("#subscribeMessage");

    message.textContent = "Thank you for subscribing!";
    message.style.color = "#b99a76";

    event.target.reset();
});

document.querySelector("#checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Checkout is a demo. No real payment will be processed.");
});
