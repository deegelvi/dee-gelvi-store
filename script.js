/* =====================================================
   DEE GELVI STORE
   CUSTOMER SHOPPING SYSTEM
   WHATSAPP + TELEGRAM
===================================================== */


/* =====================================================
   CONTACT SETTINGS
===================================================== */

const WHATSAPP_NUMBER = "6282261159669";

/*
   GANTI dengan username Telegram toko kamu.

   Contoh:
   const TELEGRAM_USERNAME = "deegelvistore";

   JANGAN pakai @
*/
const TELEGRAM_USERNAME = "ISI_USERNAME_TELEGRAM_KAMU";


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = {

    noir: {
        name: "NOAM THE GENTLE",
        price: 199000,
        category: "MEN",
        description:
            "Aroma maskulin, dark, elegant, dan berkarakter.",
        image:
            "https://i.ibb.co/5xf6Vbt2/07131f2b226a4c8cacb92e033c2960f5-tplv-aphluv4xwc-crop-webp-1080-1080.webp",
        notes: [
            "Woody",
            "Dark",
            "Warm",
            "Elegant"
        ]
    },

    royale: {
        name: "FELIX EXCLUSIVE",
        price: 199000,
        category: "MEN",
        description:
            "Fresh, sophisticated, dan cocok untuk acara spesial.",
        image:
            "https://i.ibb.co/dwz1NJcY/images3.jpg",
        notes: [
            "Fresh",
            "Citrus",
            "Woody",
            "Sophisticated"
        ]
    },

    velvet: {
        name: "VAN URBAN VOYAGER",
        price: 199000,
        category: "WOMEN",
        description:
            "Lembut, sensual, feminine, dan elegan.",
        image:
            "https://i.ibb.co/Rpc1qY4N/images1.jpg",
        notes: [
            "Floral",
            "Fresh",
            "Soft",
            "Elegant"
        ]
    },

    amber: {
        name: "DEE GELVI Amber",
        price: 289000,
        category: "UNISEX",
        description:
            "Warm amber dengan karakter mewah dan timeless.",
        image:
            "images/perfume4.jpg",
        notes: [
            "Amber",
            "Warm",
            "Woody",
            "Luxury"
        ]
    },

    oud: {
        name: "DEE GELVI Oud",
        price: 299000,
        category: "MEN",
        description:
            "Oud, woody, warm, dan powerful.",
        image:
            "images/perfume5.jpg",
        notes: [
            "Oud",
            "Woody",
            "Warm",
            "Powerful"
        ]
    },

    bloom: {
        name: "DEE GELVI Bloom",
        price: 269000,
        category: "WOMEN",
        description:
            "Floral, fresh, manis, dan memorable.",
        image:
            "images/perfume6.jpg",
        notes: [
            "Floral",
            "Fresh",
            "Sweet",
            "Feminine"
        ]
    }

};


/* =====================================================
   CART
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("deeGelviCart")
    ) || [];


/* =====================================================
   ELEMENTS
===================================================== */

const cartPanel =
    document.getElementById("cartPanel");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const openCart =
    document.getElementById("openCart");

const closeCart =
    document.getElementById("closeCart");

const checkoutWhatsApp =
    document.getElementById("checkoutWhatsApp");

const checkoutTelegram =
    document.getElementById("checkoutTelegram");

const searchInput =
    document.getElementById("productSearch");

const productCards =
    document.querySelectorAll(".product-card");

const categoryButtons =
    document.querySelectorAll(".category");

const searchButton =
    document.getElementById("searchButton");

const searchModal =
    document.getElementById("searchModal");

const searchModalInput =
    document.getElementById("searchInput");

const productModal =
    document.getElementById("productModal");

const modalImage =
    document.getElementById("modalImage");

const modalCategory =
    document.getElementById("modalCategory");

const modalName =
    document.getElementById("modalName");

const modalPrice =
    document.getElementById("modalPrice");

const modalDescription =
    document.getElementById("modalDescription");

const modalNotes =
    document.getElementById("modalNotes");

const modalAddCart =
    document.getElementById("modalAddCart");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const telegramContact =
    document.getElementById("telegramContact");


/* =====================================================
   CURRENT PRODUCT
===================================================== */

let currentProductId = null;


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "deeGelviCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId, size = "30 ML") {

    const product =
        products[productId];

    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.id === productId &&
                item.size === size
        );


    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({

            id: productId,

            name: product.name,

            price: product.price,

            image: product.image,

            size: size,

            qty: 1

        });

    }


    saveCart();

    renderCart();

    showNotification(
        `${product.name} (${size}) ditambahkan ke Shopping Bag`
    );

}


/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeFromCart(productId, size) {

    cart =
        cart.filter(
            item =>
                !(
                    item.id === productId &&
                    item.size === size
                )
        );


    saveCart();

    renderCart();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    size,
    change
) {

    const item =
        cart.find(
            item =>
                item.id === productId &&
                item.size === size
        );


    if (!item) return;


    item.qty += change;


    if (item.qty <= 0) {

        removeFromCart(
            productId,
            size
        );

        return;

    }


    saveCart();

    renderCart();

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    Shopping Bag masih kosong.
                </p>

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


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <small>
                    ${item.size || "30 ML"}
                </small>

                <small>
                    ${formatRupiah(item.price)}
                </small>

            </div>


            <div class="cart-controls">

                <button
                    type="button"
                    onclick="changeQuantity(
                        '${item.id}',
                        '${item.size}',
                        -1
                    )"
                >
                    −
                </button>


                <span>
                    ${item.qty}
                </span>


                <button
                    type="button"
                    onclick="changeQuantity(
                        '${item.id}',
                        '${item.size}',
                        1
                    )"
                >
                    +
                </button>

            </div>


            <strong>
                ${formatRupiah(subtotal)}
            </strong>


            <button
                type="button"
                class="remove-cart"
                onclick="removeFromCart(
                    '${item.id}',
                    '${item.size}'
                )"
                aria-label="Hapus produk"
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


/* =====================================================
   OPEN CART
===================================================== */

if (openCart) {

    openCart.addEventListener(
        "click",
        () => {

            cartPanel.classList.add(
                "active"
            );


            cartPanel.setAttribute(
                "aria-hidden",
                "false"
            );

        }
    );

}


/* =====================================================
   CLOSE CART
===================================================== */

if (closeCart) {

    closeCart.addEventListener(
        "click",
        () => {

            cartPanel.classList.remove(
                "active"
            );


            cartPanel.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );

}


/* =====================================================
   ADD CART BUTTON
===================================================== */

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.product;


                addToCart(
                    id,
                    "30 ML"
                );

            }
        );

    });


/* =====================================================
   SEARCH PRODUCT
===================================================== */

function filterProducts(
    keyword = "",
    category = "all"
) {

    let found = false;


    productCards.forEach(card => {

        const name =
            card.dataset.name
                .toLowerCase();


        const cardCategory =
            card.dataset.category
                .toLowerCase();


        const matchName =
            name.includes(
                keyword.toLowerCase()
            );


        const matchCategory =
            category === "all" ||
            cardCategory === category;


        const visible =
            matchName &&
            matchCategory;


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

        noResult.hidden =
            found;

    }

}


/* =====================================================
   SEARCH SHOP
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const activeCategory =
                document.querySelector(
                    ".category.active"
                );


            const category =
                activeCategory
                    ? activeCategory.dataset.category
                    : "all";


            filterProducts(
                searchInput.value.trim(),
                category
            );

        }
    );

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            const category =
                button.dataset.category;


            filterProducts(
                searchInput
                    ? searchInput.value.trim()
                    : "",
                category
            );

        }
    );

});


/* =====================================================
   HEADER SEARCH BUTTON
===================================================== */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            if (!searchModal) return;


            searchModal.classList.add(
                "active"
            );


            searchModal.setAttribute(
                "aria-hidden",
                "false"
            );


            setTimeout(
                () => {

                    if (searchModalInput) {

                        searchModalInput.focus();

                    }

                },
                100
            );

        }
    );

}


/* =====================================================
   SEARCH MODAL INPUT
===================================================== */

if (searchModalInput) {

    searchModalInput.addEventListener(
        "input",
        () => {

            if (searchInput) {

                searchInput.value =
                    searchModalInput.value;

                searchInput.dispatchEvent(
                    new Event("input")
                );

            }

        }
    );


    searchModalInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                closeModal(
                    "searchModal"
                );


                document
                    .getElementById("shop")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }

        }
    );

}


/* =====================================================
   OPEN PRODUCT MODAL
===================================================== */

function openProductModal(
    productId
) {

    const product =
        products[productId];


    if (
        !product ||
        !productModal
    ) return;


    currentProductId =
        productId;


    if (modalImage) {

        modalImage.src =
            product.image;

        modalImage.alt =
            product.name;

    }


    if (modalCategory) {

        modalCategory.textContent =
            product.category;

    }


    if (modalName) {

        modalName.textContent =
            product.name;

    }


    if (modalPrice) {

        modalPrice.textContent =
            formatRupiah(
                product.price
            );

    }


    if (modalDescription) {

        modalDescription.textContent =
            product.description;

    }


    if (modalNotes) {

        modalNotes.innerHTML =
            product.notes
                .map(
                    note =>
                        `<span>${note}</span>`
                )
                .join("");

    }


    document
        .querySelectorAll(".size")
        .forEach(
            size =>
                size.classList.remove(
                    "active"
                )
        );


    const firstSize =
        document.querySelector(
            ".size[data-size='30 ML']"
        );


    if (firstSize) {

        firstSize.classList.add(
            "active"
        );

    }


    productModal.classList.add(
        "active"
    );


    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =====================================================
   QUICK VIEW
===================================================== */

document
    .querySelectorAll(".quick-view")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    button.dataset.product;


                openProductModal(
                    productId
                );

            }
        );

    });


/* =====================================================
   SIZE SELECTOR
===================================================== */

document
    .querySelectorAll(".size")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".size")
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );

            }
        );

    });


/* =====================================================
   ADD FROM PRODUCT MODAL
===================================================== */

if (modalAddCart) {

    modalAddCart.addEventListener(
        "click",
        () => {

            if (!currentProductId) return;


            const selectedSize =
                document.querySelector(
                    ".size.active"
                );


            const size =
                selectedSize
                    ? selectedSize.dataset.size
                    : "30 ML";


            addToCart(
                currentProductId,
                size
            );


            closeModal(
                "productModal"
            );

        }
    );

}


/* =====================================================
   CLOSE MODAL FUNCTION
===================================================== */

function closeModal(
    modalId
) {

    const modal =
        document.getElementById(
            modalId
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   CLOSE BUTTONS
===================================================== */

document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    button.dataset.close
                );

            }
        );

    });


/* =====================================================
   CLOSE MODAL WHEN CLICK OUTSIDE
===================================================== */

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal(
                        modal.id
                    );

                }

            }
        );

    });


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            document
                .querySelectorAll(
                    ".modal.active"
                )
                .forEach(modal => {

                    closeModal(
                        modal.id
                    );

                });


            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "active"
                );

            }

        }

    }
);


/* =====================================================
   MOBILE MENU
===================================================== */

if (
    mobileMenuButton &&
    mobileMenu
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =====================================================
   BUILD ORDER MESSAGE
===================================================== */

function buildOrderMessage() {

    if (cart.length === 0) {

        return "";

    }


    let total = 0;

    let message =
        "Halo DEE GELVI STORE 👋\n\n";


    message +=
        "Saya ingin melakukan pemesanan:\n\n";


    cart.forEach(
        (item, index) => {

            const subtotal =
                item.price * item.qty;


            total += subtotal;


            message +=
                `${index + 1}. ${item.name}\n`;

            message +=
                `Size: ${item.size || "30 ML"}\n`;

            message +=
                `Qty: ${item.qty}\n`;

            message +=
                `Harga: ${formatRupiah(item.price)}\n`;

            message +=
                `Subtotal: ${formatRupiah(subtotal)}\n\n`;

        }
    );


    message +=
        `TOTAL: ${formatRupiah(total)}\n\n`;


    message +=
        "Mohon info stok, pembayaran, dan pengiriman.\n";

    message +=
        "Terima kasih 🙏";


    return message;

}


/* =====================================================
   CHECKOUT WHATSAPP
===================================================== */

if (checkoutWhatsApp) {

    checkoutWhatsApp.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Shopping Bag masih kosong."
                );

                return;

            }


            const message =
                buildOrderMessage();


            const url =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =====================================================
   CHECKOUT TELEGRAM
===================================================== */

if (checkoutTelegram) {

    checkoutTelegram.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Shopping Bag masih kosong."
                );

                return;

            }


            if (
                TELEGRAM_USERNAME ===
                "ISI_USERNAME_TELEGRAM_KAMU"
            ) {

                alert(
                    "Username Telegram toko belum diatur."
                );

                return;

            }


            const message =
                buildOrderMessage();


            /*
                Telegram tidak menyediakan
                format direct-message text
                yang selalu konsisten untuk
                semua akun.

                Kita buka username toko.
            */

            const url =
                `https://t.me/${TELEGRAM_USERNAME}`;


            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =====================================================
   CONTACT TELEGRAM
===================================================== */

if (telegramContact) {

    telegramContact.addEventListener(
        "click",
        () => {

            if (
                TELEGRAM_USERNAME ===
                "ISI_USERNAME_TELEGRAM_KAMU"
            ) {

                alert(
                    "Username Telegram toko belum diatur."
                );

                return;

            }


            window.open(
                `https://t.me/${TELEGRAM_USERNAME}`,
                "_blank"
            );

        }
    );

}


/* =====================================================
   NOTIFICATION
===================================================== */

function showNotification(
    text
) {

    const notification =
        document.getElementById(
            "cartNotification"
        );


    if (!notification) return;


    notification.textContent =
        text;


    notification.classList.add(
        "show"
    );


    setTimeout(
        () => {

            notification.classList.remove(
                "show"
            );

        },
        2000
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

renderCart();
