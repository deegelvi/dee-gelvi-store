/* =====================================================
   DEE GELVI STORE
   CUSTOMER SHOPPING SYSTEM
   WHATSAPP + TELEGRAM CHECKOUT
===================================================== */


/* =====================================================
   CONTACT SETTINGS
===================================================== */

const WHATSAPP_NUMBER = "6282261159669";

const TELEGRAM_USERNAME = "NewEra889";


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
        image: "images/noam.jpg"
    },

    royale: {
        name: "FELIX EXCLUSIVE",
        price: 199000,
        category: "MEN",
        description:
            "Fresh, sophisticated, dan cocok untuk acara spesial.",
        image: "images/felix.jpg"
    },

    velvet: {
        name: "VAN URBAN VOYAGER",
        price: 199000,
        category: "WOMEN",
        description:
            "Lembut, sensual, feminine, dan elegan.",
        image: "images/van.jpg"
    },

    amber: {
        name: "DEE GELVI AMBER",
        price: 289000,
        category: "UNISEX",
        description:
            "Warm amber dengan karakter mewah dan timeless.",
        image: "images/perfume4.jpg"
    },

    shadow: {
        name: "SHADOW MAN",
        price: 299000,
        category: "MEN",
        description:
            "Dark, woody, maskulin, dan berkarakter kuat.",
        image: "images/shadow.jpg"
    },

    bloom: {
        name: "DEE GELVI BLOOM",
        price: 269000,
        category: "WOMEN",
        description:
            "Floral, fresh, manis, dan memorable.",
        image: "images/perfume6.jpg"
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

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


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

function addToCart(productId) {

    const product =
        products[productId];

    if (!product) {

        console.warn(
            "Produk tidak ditemukan:",
            productId
        );

        return;
    }


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({

            id: productId,

            name: product.name,

            price: product.price,

            category: product.category,

            image: product.image,

            qty: 1

        });

    }


    saveCart();

    renderCart();

    showNotification(
        product.name +
        " ditambahkan ke Shopping Bag"
    );

}


/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveCart();

    renderCart();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            item => item.id === productId
        );

    if (!item) return;


    item.qty += change;


    if (item.qty <= 0) {

        removeFromCart(productId);

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
                    ${formatRupiah(item.price)}
                </small>

            </div>


            <div class="cart-controls">

                <button
                    type="button"
                    onclick="changeQuantity('${item.id}', -1)"
                    aria-label="Kurangi jumlah"
                >
                    −
                </button>


                <span>
                    ${item.qty}
                </span>


                <button
                    type="button"
                    onclick="changeQuantity('${item.id}', 1)"
                    aria-label="Tambah jumlah"
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
                onclick="removeFromCart('${item.id}')"
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

            if (!cartPanel) return;


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

            if (!cartPanel) return;


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

                addToCart(id);

            }
        );

    });


/* =====================================================
   SEARCH SHOP
===================================================== */

function filterProducts() {

    const keyword =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const activeCategory =
        document.querySelector(
            ".category.active"
        );


    const selectedCategory =
        activeCategory
            ? activeCategory.dataset.category
            : "all";


    let found = false;


    productCards.forEach(card => {

        const name =
            (
                card.dataset.name || ""
            ).toLowerCase();


        const category =
            (
                card.dataset.category || ""
            ).toLowerCase();


        const descriptionElement =
            card.querySelector(
                ".product-desc"
            );


        const description =
            descriptionElement
                ? descriptionElement.textContent
                    .toLowerCase()
                : "";


        const matchSearch =

            name.includes(keyword) ||

            description.includes(keyword);


        const matchCategory =

            selectedCategory === "all" ||

            category === selectedCategory;


        const visible =
            matchSearch &&
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


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
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
                btn => {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            filterProducts();

        }
    );

});


/* =====================================================
   SEARCH MODAL
===================================================== */

if (
    searchButton &&
    searchModal
) {

    searchButton.addEventListener(
        "click",
        () => {

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

                filterProducts();

            }

        }
    );

}


/* =====================================================
   CLOSE MODALS
===================================================== */

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modalId =
                    button.dataset.close;


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

                    modal.classList.remove(
                        "active"
                    );


                    modal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );

    });


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


                const product =
                    products[productId];


                if (!product) {

                    console.warn(
                        "Produk Quick View tidak ditemukan:",
                        productId
                    );

                    return;

                }


                const modal =
                    document.getElementById(
                        "productModal"
                    );


                const modalImage =
                    document.getElementById(
                        "modalImage"
                    );


                const modalName =
                    document.getElementById(
                        "modalName"
                    );


                const modalCategory =
                    document.getElementById(
                        "modalCategory"
                    );


                const modalPrice =
                    document.getElementById(
                        "modalPrice"
                    );


                const modalDescription =
                    document.getElementById(
                        "modalDescription"
                    );


                const modalNotes =
                    document.getElementById(
                        "modalNotes"
                    );


                /* IMAGE */

                if (modalImage) {

                    modalImage.src =
                        product.image;

                    modalImage.alt =
                        product.name;

                }


                /* NAME */

                if (modalName) {

                    modalName.textContent =
                        product.name;

                }


                /* CATEGORY */

                if (modalCategory) {

                    modalCategory.textContent =
                        product.category;

                }


                /* PRICE */

                if (modalPrice) {

                    modalPrice.textContent =
                        formatRupiah(
                            product.price
                        );

                }


                /* DESCRIPTION */

                if (modalDescription) {

                    modalDescription.textContent =
                        product.description;

                }


                /* NOTES */

                if (modalNotes) {

                    modalNotes.innerHTML = `

                        <span>
                            Signature
                        </span>

                        <span>
                            Elegant
                        </span>

                        <span>
                            Long Lasting
                        </span>

                    `;

                }


                /* MODAL ADD CART */

                const modalAddCart =
                    document.getElementById(
                        "modalAddCart"
                    );


                if (modalAddCart) {

                    modalAddCart.onclick =
                        () => {

                            addToCart(
                                productId
                            );


                            if (modal) {

                                modal.classList.remove(
                                    "active"
                                );


                                modal.setAttribute(
                                    "aria-hidden",
                                    "true"
                                );

                            }

                        };

                }


                /* OPEN MODAL */

                if (modal) {

                    modal.classList.add(
                        "active"
                    );


                    modal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }

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

                const parent =
                    button.closest(
                        ".sizes"
                    );


                if (!parent) return;


                parent
                    .querySelectorAll(
                        ".size"
                    )
                    .forEach(
                        size =>
                            size.classList.remove(
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
   CREATE ORDER MESSAGE
===================================================== */

function createOrderMessage() {

    let message =
        "Halo DEE GELVI STORE 👋\n\n";


    message +=
        "Saya ingin melakukan pemesanan:\n\n";


    let total = 0;


    cart.forEach(
        (item, index) => {

            const subtotal =
                item.price *
                item.qty;


            total += subtotal;


            message +=
                `${index + 1}. ${item.name}\n`;


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
        "Mohon info stok dan pembayaran.\n";


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
                createOrderMessage();


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
        async () => {

            if (cart.length === 0) {

                alert(
                    "Shopping Bag masih kosong."
                );

                return;

            }


            const message =
                createOrderMessage();


            const telegramUrl =
                `https://t.me/${TELEGRAM_USERNAME}`;


            window.open(
                telegramUrl,
                "_blank"
            );


            try {

                await navigator.clipboard.writeText(
                    message
                );


                showNotification(
                    "Detail pesanan disalin. Paste di Telegram."
                );

            } catch (error) {

                showNotification(
                    "Telegram dibuka. Silakan kirim detail pesanan."
                );

            }

        }
    );

}


/* =====================================================
   CONTACT VIA TELEGRAM
===================================================== */

const telegramContact =
    document.getElementById(
        "telegramContact"
    );


if (telegramContact) {

    telegramContact.addEventListener(
        "click",
        () => {

            const telegramUrl =
                `https://t.me/${TELEGRAM_USERNAME}`;


            window.open(
                telegramUrl,
                "_blank"
            );

        }
    );

}


/* =====================================================
   NOTIFICATION
===================================================== */

function showNotification(text) {

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
        2500
    );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) return;


        document
            .querySelectorAll(
                ".modal.active"
            )
            .forEach(modal => {

                modal.classList.remove(
                    "active"
                );


                modal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            });


        if (cartPanel) {

            cartPanel.classList.remove(
                "active"
            );


            cartPanel.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderCart();
