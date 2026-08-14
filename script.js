/* =========================================================
   DEE GELVI STORE
   FINAL CLEAN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

    const products = {

        noam: {
            name: "NOAM THE GENTLE",
            category: "MEN",
            collection: "DEE GELVI ORIGINAL",
            image: "images/noam.jpg",
            price: 12.5,
            description:
                "Aroma maskulin, clean, elegan, dan berkarakter. Cocok untuk kamu yang menyukai fragrance dengan kesan gentleman modern.",
            notes:
                "CHARACTER — CLEAN • MASCULINE • ELEGANT"
        },

        felix: {
            name: "FELIX EXCLUSIVE",
            category: "MEN",
            collection: "DEE GELVI ORIGINAL",
            image: "images/felix.jpg",
            price: 12.5,
            description:
                "Fresh dan sophisticated dengan karakter modern yang cocok digunakan untuk acara spesial maupun daily signature.",
            notes:
                "CHARACTER — FRESH • SOPHISTICATED • MODERN"
        },

        van: {
            name: "VAN URBAN VOYAGER",
            category: "WOMEN",
            collection: "DEE GELVI ORIGINAL",
            image: "images/van.jpg",
            price: 12.5,
            description:
                "Fragrance lembut, sensual, feminine, dan elegan untuk melengkapi penampilan dengan karakter yang memorable.",
            notes:
                "CHARACTER — SOFT • FEMININE • ELEGANT"
        },

        shadow: {
            name: "SHADOW MAN",
            category: "MEN",
            collection: "DEE GELVI ORIGINAL",
            image: "images/shadow.jpg",
            price: 12.5,
            description:
                "Dark, woody, maskulin, dan berkarakter kuat. Signature fragrance untuk menciptakan kesan yang sulit dilupakan.",
            notes:
                "CHARACTER — DARK • WOODY • MASCULINE"
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body =
        document.body;

    const productCards =
        document.querySelectorAll(".product-card");

    const categoryButtons =
        document.querySelectorAll(".category");

    const quickViewButtons =
        document.querySelectorAll(".quick-view");

    const addCartButtons =
        document.querySelectorAll(".add-cart");

    const productSearch =
        document.getElementById("productSearch");

    const noResult =
        document.getElementById("noResult");

    const searchButton =
        document.getElementById("searchButton");

    const searchModal =
        document.getElementById("searchModal");

    const searchInput =
        document.getElementById("searchInput");

    const productModal =
        document.getElementById("productModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalCollection =
        document.getElementById("modalCollection");

    const modalName =
        document.getElementById("modalName");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalNotes =
        document.getElementById("modalNotes");

    const modalPrice =
        document.getElementById("modalPrice");

    const modalAddCart =
        document.getElementById("modalAddCart");

    const openCart =
        document.getElementById("openCart");

    const closeCart =
        document.getElementById("closeCart");

    const cartPanel =
        document.getElementById("cartPanel");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");

    const checkoutWhatsApp =
        document.getElementById("checkoutWhatsApp");

    const checkoutTelegram =
        document.getElementById("checkoutTelegram");

    const telegramContact =
        document.getElementById("telegramContact");

    const cartNotification =
        document.getElementById("cartNotification");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    /* =====================================================
       SETTINGS
    ===================================================== */

    const WHATSAPP_NUMBER =
        "6281234567890";

    const TELEGRAM_USERNAME =
        "NewEra889";


    /* =====================================================
       STATE
    ===================================================== */

    let cart = [];

    let currentModalProduct =
        null;

    let currentFilter =
        "all";


    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    function formatPrice(number) {

        return `$${Number(number).toFixed(1)}`;

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    function showNotification(message) {

        if (!cartNotification) {
            return;
        }

        cartNotification.textContent =
            message;

        cartNotification.classList.add(
            "show"
        );

        clearTimeout(
            window.notificationTimer
        );

        window.notificationTimer =
            setTimeout(() => {

                cartNotification.classList.remove(
                    "show"
                );

            }, 2500);

    }


    /* =====================================================
       MODAL
    ===================================================== */

    function openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add(
            "modal-open"
        );

    }


    function closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        const productOpen =
            productModal &&
            productModal.classList.contains(
                "active"
            );


        const searchOpen =
            searchModal &&
            searchModal.classList.contains(
                "active"
            );


        if (
            !productOpen &&
            !searchOpen
        ) {

            body.classList.remove(
                "modal-open"
            );

        }

    }


    /* =====================================================
       QUICK VIEW
    ===================================================== */

    function openProductModal(productId) {

        const product =
            products[productId];


        if (!product) {

            console.warn(
                "Product tidak ditemukan:",
                productId
            );

            return;

        }


        currentModalProduct =
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


        if (modalCollection) {

            modalCollection.textContent =
                product.collection;

        }


        if (modalName) {

            modalName.textContent =
                product.name;

        }


        if (modalDescription) {

            modalDescription.textContent =
                product.description;

        }


        if (modalNotes) {

            modalNotes.textContent =
                product.notes;

        }


        if (modalPrice) {

            modalPrice.textContent =
                formatPrice(
                    product.price
                );

        }


        openModal(
            productModal
        );

    }


    /* =====================================================
       QUICK VIEW EVENTS
    ===================================================== */

    quickViewButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const productId =
                        button.dataset.product;

                    openProductModal(
                        productId
                    );

                }
            );

        }
    );


    /* =====================================================
       ADD TO CART
    ===================================================== */

    function addToCart(productId) {

        const product =
            products[productId];


        if (!product) {

            console.warn(
                "Product tidak ditemukan:",
                productId
            );

            return;

        }


        const existing =
            cart.find(
                item =>
                    item.id === productId
            );


        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({

                id: productId,

                quantity: 1

            });

        }


        renderCart();


        showNotification(
            `${product.name} ditambahkan ke shopping bag.`
        );

    }


    /* =====================================================
       MODAL ADD CART
    ===================================================== */

    if (modalAddCart) {

        modalAddCart.addEventListener(
            "click",
            () => {

                if (!currentModalProduct) {
                    return;
                }


                addToCart(
                    currentModalProduct
                );


                closeModal(
                    productModal
                );

            }
        );

    }


    /* =====================================================
       PRODUCT ADD CART BUTTONS
    ===================================================== */

    addCartButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        button.dataset.product;

                    addToCart(
                        productId
                    );

                }
            );

        }
    );


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        if (!cartItems) {
            return;
        }


        cartItems.innerHTML =
            "";


        let total =
            0;


        let totalQuantity =
            0;


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <p>
                        YOUR BAG IS EMPTY
                    </p>

                    <span>
                        Pilih fragrance favorit kamu.
                    </span>

                </div>

            `;

        }


        cart.forEach(
            item => {

                const product =
                    products[item.id];


                if (!product) {
                    return;
                }


                const subtotal =
                    product.price *
                    item.quantity;


                total +=
                    subtotal;


                totalQuantity +=
                    item.quantity;


                const itemElement =
                    document.createElement(
                        "div"
                    );


                itemElement.className =
                    "cart-item";


                itemElement.innerHTML = `

                    <div class="cart-item-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${product.name}
                        </h4>

                        <span>
                            ${formatPrice(product.price)}
                        </span>


                        <div class="cart-quantity">

                            <button
                                type="button"
                                data-action="decrease"
                                data-id="${item.id}"
                            >
                                −
                            </button>


                            <strong>
                                ${item.quantity}
                            </strong>


                            <button
                                type="button"
                                data-action="increase"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="remove-cart"
                        data-action="remove"
                        data-id="${item.id}"
                        aria-label="Hapus produk"
                    >
                        ×
                    </button>

                `;


                cartItems.appendChild(
                    itemElement
                );

            }
        );


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(
                    total
                );

        }


        if (cartCount) {

            cartCount.textContent =
                totalQuantity;

        }

    }


    /* =====================================================
       CART ACTION
    ===================================================== */

    if (cartItems) {

        cartItems.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "button"
                    );


                if (!button) {
                    return;
                }


                const productId =
                    button.dataset.id;


                const action =
                    button.dataset.action;


                const item =
                    cart.find(
                        cartItem =>
                            cartItem.id ===
                            productId
                    );


                if (!item) {
                    return;
                }


                if (
                    action ===
                    "increase"
                ) {

                    item.quantity +=
                        1;

                }


                if (
                    action ===
                    "decrease"
                ) {

                    item.quantity -=
                        1;


                    if (
                        item.quantity <=
                        0
                    ) {

                        cart =
                            cart.filter(
                                cartItem =>
                                    cartItem.id !==
                                    productId
                            );

                    }

                }


                if (
                    action ===
                    "remove"
                ) {

                    cart =
                        cart.filter(
                            cartItem =>
                                cartItem.id !==
                                productId
                        );

                }


                renderCart();

            }
        );

    }


    /* =====================================================
       OPEN CART
    ===================================================== */

    if (openCart) {

        openCart.addEventListener(
            "click",
            () => {

                renderCart();


                if (cartPanel) {

                    cartPanel.classList.add(
                        "active"
                    );

                }


                if (cartOverlay) {

                    cartOverlay.classList.add(
                        "active"
                    );

                }


                body.classList.add(
                    "cart-open"
                );

            }
        );

    }


    /* =====================================================
       CLOSE CART
    ===================================================== */

    function closeCartPanel() {

        if (cartPanel) {

            cartPanel.classList.remove(
                "active"
            );

        }


        if (cartOverlay) {

            cartOverlay.classList.remove(
                "active"
            );

        }


        body.classList.remove(
            "cart-open"
        );

    }


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            closeCartPanel
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCartPanel
        );

    }


    /* =====================================================
       SEARCH & FILTER
    ===================================================== */

    function filterProducts() {

        if (!productSearch) {
            return;
        }


        const searchTerm =
            productSearch.value
                .trim()
                .toLowerCase();


        let visibleCount =
            0;


        productCards.forEach(
            card => {

                const name =
                    (
                        card.dataset.name ||
                        ""
                    ).toLowerCase();


                const category =
                    (
                        card.dataset.category ||
                        ""
                    ).toLowerCase();


                const collection =
                    (
                        card.dataset.collection ||
                        ""
                    ).toLowerCase();


                const matchesSearch =
                    !searchTerm ||
                    name.includes(
                        searchTerm
                    );


                let matchesFilter =
                    true;


                switch (
                    currentFilter
                ) {

                    case "men":

                        matchesFilter =
                            category ===
                            "men";

                        break;


                    case "women":

                        matchesFilter =
                            category ===
                            "women";

                        break;


                    case "unisex":

                        matchesFilter =
                            category ===
                            "unisex";

                        break;


                    case "dee-gelvi":

                        matchesFilter =
                            collection ===
                            "dee-gelvi";

                        break;


                    case "curated":

                        matchesFilter =
                            collection ===
                            "curated";

                        break;


                    default:

                        matchesFilter =
                            true;

                }


                const visible =
                    matchesSearch &&
                    matchesFilter;


                card.style.display =
                    visible
                        ? ""
                        : "none";


                if (visible) {
                    visibleCount++;
                }

            }
        );


        if (noResult) {

            noResult.hidden =
                visibleCount !== 0;

        }

    }


    if (productSearch) {

        productSearch.addEventListener(
            "input",
            filterProducts
        );

    }


    /* =====================================================
       CATEGORY BUTTONS
    ===================================================== */

    categoryButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    categoryButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter ||
                        "all";


                    filterProducts();

                }
            );

        }
    );


    /* =====================================================
       SEARCH MODAL
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                openModal(
                    searchModal
                );


                setTimeout(
                    () => {

                        if (searchInput) {

                            searchInput.focus();

                        }

                    },
                    100
                );

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                if (productSearch) {

                    productSearch.value =
                        searchInput.value;

                }


                filterProducts();

            }
        );


        searchInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !==
                    "Enter"
                ) {
                    return;
                }


                closeModal(
                    searchModal
                );


                const shop =
                    document.getElementById(
                        "shop"
                    );


                if (shop) {

                    shop.scrollIntoView({
                        behavior:
                            "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       CLOSE MODALS
    ===================================================== */

    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const targetId =
                            button.dataset.close;


                        const modal =
                            document.getElementById(
                                targetId
                            );


                        closeModal(
                            modal
                        );

                    }
                );

            }
        );


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    [
        productModal,
        searchModal
    ].forEach(
        modal => {

            if (!modal) {
                return;
            }


            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        modal
                    ) {

                        closeModal(
                            modal
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            closeModal(
                productModal
            );


            closeModal(
                searchModal
            );


            closeCartPanel();


            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                if (mobileMenu) {

                    mobileMenu.classList.toggle(
                        "active"
                    );

                }

            }
        );

    }


    if (mobileMenu) {

        mobileMenu
            .querySelectorAll("a")
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            mobileMenu.classList.remove(
                                "active"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       WHATSAPP CHECKOUT
    ===================================================== */

    if (checkoutWhatsApp) {

        checkoutWhatsApp.addEventListener(
            "click",
            () => {

                if (
                    cart.length ===
                    0
                ) {

                    showNotification(
                        "Shopping bag masih kosong."
                    );

                    return;

                }


                let message =
                    "Halo DEE GELVI, saya ingin memesan:\n\n";


                let total =
                    0;


                cart.forEach(
                    item => {

                        const product =
                            products[item.id];


                        if (!product) {
                            return;
                        }


                        const subtotal =
                            product.price *
                            item.quantity;


                        total +=
                            subtotal;


                        message +=
                            `• ${product.name} x${item.quantity} — ${formatPrice(subtotal)}\n`;

                    }
                );


                message +=
                    `\nTOTAL: ${formatPrice(total)}`;


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
       TELEGRAM CONTACT
    ===================================================== */

    if (telegramContact) {

        telegramContact.addEventListener(
            "click",
            () => {

                window.open(
                    `https://t.me/${TELEGRAM_USERNAME}`,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       TELEGRAM CHECKOUT
    ===================================================== */

    if (checkoutTelegram) {

        checkoutTelegram.addEventListener(
            "click",
            () => {

                if (
                    cart.length ===
                    0
                ) {

                    showNotification(
                        "Shopping bag masih kosong."
                    );

                    return;

                }


                let message =
                    "Halo DEE GELVI 👋\n\n" +
                    "Saya ingin memesan:\n\n";


                let total =
                    0;


                cart.forEach(
                    item => {

                        const product =
                            products[item.id];


                        if (!product) {
                            return;
                        }


                        const subtotal =
                            product.price *
                            item.quantity;


                        total +=
                            subtotal;


                        message +=
                            `• ${product.name} x${item.quantity} — ${formatPrice(subtotal)}\n`;

                    }
                );


                message +=
                    `\nTOTAL: ${formatPrice(total)}`;


                message +=
                    "\n\nMohon info ketersediaan dan cara pembayarannya. Terima kasih 🙏";


                const telegramURL =
                    `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;


                window.open(
                    telegramURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       INITIAL
    ===================================================== */

    renderCart();

    filterProducts();

});
