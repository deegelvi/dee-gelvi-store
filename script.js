/* =====================================================
   DEE GELVI STORE
   CUSTOMER SHOPPING SYSTEM
===================================================== */


/* =========================
   WHATSAPP
========================= */

const WHATSAPP_NUMBER = "6282261159669";


/* =========================
   PRODUCT DATA
========================= */

const products = {

    noir: {
        name: "NOAM THE GENTLE",
        price: 199000,
        category: "MEN",
        description: "Aroma maskulin, dark, elegant, dan berkarakter.",
        image: "https://i.ibb.co/5xf6Vbt2/07131f2b226a4c8cacb92e033c2960f5-tplv-aphluv4xwc-crop-webp-1080-1080.webp"
    },

    royale: {
        name: "FELIX EXCLUSIVE",
        price: 199000,
        category: "MEN",
        description: "Fresh, sophisticated, dan cocok untuk acara spesial.",
        image: "https://i.ibb.co/dwz1NJcY/images3.jpg"
    },

    velvet: {
        name: "VAN URBAN VOYAGER",
        price: 199000,
        category: "WOMEN",
        description: "Lembut, sensual, feminine, dan elegan.",
        image: "https://i.ibb.co/Rpc1qY4N/images1.jpg"
    },

    amber: {
        name: "DEE GELVI Amber",
        price: 289000,
        category: "UNISEX",
        description: "Warm amber dengan karakter mewah dan timeless.",
        image: "images/perfume4.jpg"
    },

    oud: {
        name: "DEE GELVI Oud",
        price: 299000,
        category: "MEN",
        description: "Oud, woody, warm, dan powerful.",
        image: "images/perfume5.jpg"
    },

    bloom: {
        name: "DEE GELVI Bloom",
        price: 269000,
        category: "WOMEN",
        description: "Floral, fresh, manis, dan memorable.",
        image: "images/perfume6.jpg"
    }

};


/* =========================
   CART
========================= */

let cart = JSON.parse(localStorage.getItem("deeGelviCart")) || [];


/* =========================
   ELEMENTS
========================= */

const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

const checkoutButton =
    document.getElementById("checkoutTelegram");

const searchInput =
    document.getElementById("productSearch");

const productCards =
    document.querySelectorAll(".product-card");

const categoryButtons =
    document.querySelectorAll(".category");


/* =========================
   FORMAT RUPIAH
========================= */

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "deeGelviCart",
        JSON.stringify(cart)
    );

}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const product = products[productId];

    if (!product) return;


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({

            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1

        });

    }


    saveCart();

    renderCart();

    showNotification(
        product.name + " ditambahkan ke Shopping Bag"
    );

}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    saveCart();

    renderCart();

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;


    item.qty += change;


    if (item.qty <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    renderCart();

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Shopping Bag masih kosong.</p>
            </div>
        `;

    }


    let total = 0;
    let totalItems = 0;


    cart.forEach(item => {

        const subtotal =
            item.price * item.qty;

        total += subtotal;

        totalItems += item.qty;


        const element =
            document.createElement("div");

        element.className = "cart-item";


        element.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <small>
                    ${formatRupiah(item.price)}
                </small>

            </div>


            <div class="cart-controls">

                <button
                    onclick="changeQuantity('${item.id}', -1)"
                >
                    −
                </button>

                <span>
                    ${item.qty}
                </span>

                <button
                    onclick="changeQuantity('${item.id}', 1)"
                >
                    +
                </button>

            </div>


            <strong>
                ${formatRupiah(subtotal)}
            </strong>


            <button
                class="remove-cart"
                onclick="removeFromCart('${item.id}')"
            >
                ×
            </button>

        `;


        cartItems.appendChild(element);

    });


    if (cartTotal) {

        cartTotal.textContent =
            formatRupiah(total);

    }


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }

}


/* =========================
   OPEN CART
========================= */

if (openCart) {

    openCart.addEventListener("click", () => {

        cartPanel.classList.add("active");

        cartPanel.setAttribute(
            "aria-hidden",
            "false"
        );

    });

}


/* =========================
   CLOSE CART
========================= */

if (closeCart) {

    closeCart.addEventListener("click", () => {

        cartPanel.classList.remove("active");

        cartPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    });

}


/* =========================
   ADD CART BUTTON
========================= */

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.product;

                addToCart(id);

            }
        );

    });


/* =========================
   SEARCH
========================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const keyword =
                searchInput.value
                    .toLowerCase()
                    .trim();


            let found = false;


            productCards.forEach(card => {

                const name =
                    card.dataset.name
                        .toLowerCase();


                const visible =
                    name.includes(keyword);


                card.style.display =
                    visible ? "" : "none";


                if (visible) {

                    found = true;

                }

            });


            const noResult =
                document.getElementById(
                    "noResult"
                );


            if (noResult) {

                noResult.hidden = found;

            }

        }
    );

}


/* =========================
   CATEGORY FILTER
========================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(
                btn =>
                    btn.classList.remove("active")
            );


            button.classList.add("active");


            const category =
                button.dataset.category;


            productCards.forEach(card => {

                const cardCategory =
                    card.dataset.category
                        .toLowerCase();


                if (
                    category === "all" ||
                    cardCategory === category
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        }
    );

});


/* =========================
   CHECKOUT WHATSAPP
========================= */

if (checkoutButton) {

    checkoutButton.textContent =
        "CHECKOUT VIA WHATSAPP";


    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Shopping Bag masih kosong."
                );

                return;

            }


            let message =
                "Halo DEE GELVI STORE 👋%0A%0A";

            message +=
                "Saya ingin melakukan pemesanan:%0A%0A";


            let total = 0;


            cart.forEach(
                (item, index) => {

                    const subtotal =
                        item.price * item.qty;

                    total += subtotal;


                    message +=
                        `${index + 1}. ${item.name}%0A`;

                    message +=
                        `Qty: ${item.qty}%0A`;

                    message +=
                        `Harga: ${formatRupiah(item.price)}%0A`;

                    message +=
                        `Subtotal: ${formatRupiah(subtotal)}%0A%0A`;

                }
            );


            message +=
                `TOTAL: ${formatRupiah(total)}%0A%0A`;

            message +=
                "Mohon info stok dan pembayaran. Terima kasih 🙏";


            const url =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =========================
   NOTIFICATION
========================= */

function showNotification(text) {

    const notification =
        document.getElementById(
            "cartNotification"
        );


    if (!notification) return;


    notification.textContent = text;

    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 2000);

}


/* =========================
   INITIALIZE
========================= */

renderCart();