/* =========================================================
   DEE GELVI STORE
   FINAL CLEAN JAVASCRIPT
   PRICE SYSTEM : USD
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
            category: "MEN",
            collection: "DEE GELVI ORIGINAL",
            image: "images/van.jpg",
            price: 12.5,
            description:
                "Fresh, modern, maskulin, dan elegan untuk menemani aktivitas harian maupun perjalanan dengan karakter yang memorable.",
            notes:
                "CHARACTER — FRESH • MODERN • MASCULINE • ELEGANT"
        }

    };


    /* =====================================================
       SETTINGS
    ===================================================== */

    const WHATSAPP_NUMBER =
        "6281234567890";

    const TELEGRAM_USERNAME =
        "NewEra889";

    const CART_STORAGE_KEY =
        "deeGelviShoppingCart";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body =
        document.body;

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );

    const categoryButtons =
        document.querySelectorAll(
            ".category"
        );

    const quickViewButtons =
        document.querySelectorAll(
            ".quick-view"
        );

    const addCartButtons =
        document.querySelectorAll(
            ".add-cart"
        );

    const productSearch =
        document.getElementById(
            "productSearch"
        );

    const noResult =
        document.getElementById(
            "noResult"
        );

    const searchButton =
        document.getElementById(
            "searchButton"
        );

    const searchModal =
        document.getElementById(
            "searchModal"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const productModal =
        document.getElementById(
            "productModal"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalCollection =
        document.getElementById(
            "modalCollection"
        );

    const modalName =
        document.getElementById(
            "modalName"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalNotes =
        document.getElementById(
            "modalNotes"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );

    const modalAddCart =
        document.getElementById(
            "modalAddCart"
        );

    const openCart =
        document.getElementById(
            "openCart"
        );

    const closeCart =
        document.getElementById(
            "closeCart"
        );

    const cartPanel =
        document.getElementById(
            "cartPanel"
        );

    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const checkoutWhatsApp =
        document.getElementById(
            "checkoutWhatsApp"
        );

    const checkoutTelegram =
        document.getElementById(
            "checkoutTelegram"
        );

    const telegramContact =
        document.getElementById(
            "telegramContact"
        );

    const cartNotification =
        document.getElementById(
            "cartNotification"
        );

    const mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    /* =====================================================
       STATE
    ===================================================== */

    let currentModalProduct =
        null;

    let currentFilter =
        "all";

    let cart =
        [];


    /* =====================================================
       PRICE FORMAT
    ===================================================== */

    function formatPrice(number) {

        return `$${Number(number).toFixed(1)}`;

    }


    /* =====================================================
       LOAD CART
    ===================================================== */

    try {

        const savedCart =
            localStorage.getItem(
                CART_STORAGE_KEY
            );

        if (savedCart) {

            const parsedCart =
                JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {

                cart =
                    parsedCart.filter(
                        item =>
                            products[item.id] &&
                            Number(item.quantity) > 0
                    );

            }

        }

    } catch (error) {

        console.warn(
            "Cart storage tidak dapat dibaca.",
            error
        );

        cart = [];

    }


    /* =====================================================
       SAVE CART
    ===================================================== */

    function saveCart() {

        try {

            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(cart)
            );

        } catch (error) {

            console.warn(
                "Cart tidak dapat disimpan.",
                error
            );

        }

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
            window.deeGelviNotificationTimer
        );

        window.deeGelviNotificationTimer =
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

                    event.preventDefault();

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
                    item.id ===
                    productId
            );


        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({

                id:
                    productId,

                quantity:
                    1

            });

        }


        saveCart();

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
       PRODUCT ADD CART
    ===================================================== */

    addCartButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

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


        /* EMPTY */

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


        /* ITEMS */

        cart.forEach(
            item => {

                const product =
                    products[item.id];

                if (!product) {
                    return;
                }


                const quantity =
                    Number(item.quantity);


                const subtotal =
                    product.price *
                    quantity;


                total +=
                    subtotal;


                totalQuantity +=
                    quantity;


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

                        <span class="cart-item-price">
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
                                ${quantity}
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
                    >
                        ×
                    </button>

                `;


                cartItems.appendChild(
                    itemElement
                );

            }
        );


        /* TOTAL */

        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(total);

        }


        /* COUNT */

        if (cartCount) {

            cartCount.textContent =
                totalQuantity;

        }


        saveCart();

    }


    /* =====================================================
       CART ACTIONS
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

                    item.quantity += 1;

                }


                if (
                    action ===
                    "decrease"
                ) {

                    item.quantity -= 1;

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


                saveCart();

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
            event => {

                event.preventDefault();

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
                    )
                    .toLowerCase();


                const category =
                    (
                        card.dataset.category ||
                        ""
                    )
                    .toLowerCase();


                const collection =
                    (
                        card.dataset.collection ||
                        ""
                    )
                    .toLowerCase();


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
                            collection.includes(
                                "dee-gelvi"
                            );

                        break;


                    case "curated":

                        matchesFilter =
                            collection.includes(
                                "curated"
                            );

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
                event => {

                    event.preventDefault();


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
            event => {

                event.preventDefault();

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
                    event => {

                        event.preventDefault();


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
            event => {

                event.preventDefault();


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
       CREATE CHECKOUT MESSAGE
    ===================================================== */

    function createCheckoutMessage() {

        if (cart.length === 0) {

            return null;

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


        return message;

    }


    /* =====================================================
       WHATSAPP CHECKOUT
    ===================================================== */

    if (checkoutWhatsApp) {

        checkoutWhatsApp.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const message =
                    createCheckoutMessage();


                if (!message) {

                    showNotification(
                        "Shopping bag masih kosong."
                    );

                    return;

                }


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
            event => {

                event.preventDefault();


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
            event => {

                event.preventDefault();


                const message =
                    createCheckoutMessage();


                if (!message) {

                    showNotification(
                        "Shopping bag masih kosong."
                    );

                    return;

                }


                /*
                 * Telegram username biasa tidak selalu
                 * mendukung pre-filled message.
                 * Kita buka chat terlebih dahulu.
                 */

                const telegramURL =
                    `https://t.me/${TELEGRAM_USERNAME}`;


                window.open(
                    telegramURL,
                    "_blank"
                );


                /*
                 * Salin pesan ke clipboard agar
                 * user tinggal paste ke Telegram.
                 */

                if (
                    navigator.clipboard &&
                    navigator.clipboard.writeText
                ) {

                    navigator.clipboard
                        .writeText(message)
                        .then(() => {

                            showNotification(
                                "Pesanan disalin. Paste pesan di Telegram."
                            );

                        })
                        .catch(() => {

                            showNotification(
                                "Telegram dibuka. Salin detail pesanan secara manual."
                            );

                        });

                } else {

                    showNotification(
                        "Telegram dibuka."
                    );

                }

            }
        );

    }


    /* =====================================================
       FORCE CHECKOUT BUTTON SIZE
    ===================================================== */

    function fixCheckoutButtons() {

        [
            checkoutWhatsApp,
            checkoutTelegram
        ].forEach(
            button => {

                if (!button) {
                    return;
                }


                button.style.width =
                    "100%";

                button.style.minWidth =
                    "100%";

                button.style.maxWidth =
                    "100%";

                button.style.boxSizing =
                    "border-box";

                button.style.display =
                    "flex";

                button.style.alignItems =
                    "center";

                button.style.justifyContent =
                    "center";

            }
        );

    }


    /* =====================================================
       FINAL CART UI
    ===================================================== */

    const finalCartStyle =
        document.createElement(
            "style"
        );


    finalCartStyle.textContent = `

        #cartOverlay {

            position: fixed !important;

            inset: 0 !important;

            width: 100vw !important;

            height: 100vh !important;

            z-index: 99998 !important;

            background:
                rgba(0,0,0,.45) !important;

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

        }


        #cartOverlay.active {

            opacity: 1 !important;

            visibility: visible !important;

            pointer-events: auto !important;

        }


        #cartPanel {

            position: fixed !important;

            top: 0 !important;

            right: 0 !important;

            bottom: 0 !important;

            left: auto !important;

            width: 410px !important;

            max-width: 100vw !important;

            height: 100vh !important;

            max-height: 100vh !important;

            margin: 0 !important;

            padding: 0 !important;

            box-sizing: border-box !important;

            display: flex !important;

            flex-direction: column !important;

            background: #fffdf9 !important;

            z-index: 99999 !important;

            overflow: hidden !important;

            transform:
                translateX(100%) !important;

            transition:
                transform .35s ease !important;

        }


        #cartPanel.active {

            transform:
                translateX(0) !important;

        }


        #cartPanel .cart-header {

            flex:
                0 0 auto !important;

            width: 100% !important;

            min-height: 84px !important;

            height: 84px !important;

            box-sizing: border-box !important;

            padding:
                15px 14px !important;

            display: flex !important;

            align-items: center !important;

            justify-content: space-between !important;

            background: #fffdf9 !important;

            border-bottom:
                1px solid #dedbd5 !important;

        }


        #cartPanel .cart-header h2 {

            margin:
                4px 0 0 !important;

            font-family:
                Georgia,
                serif !important;

            font-size: 20px !important;

            font-weight: normal !important;

        }


        #cartPanel .cart-header span {

            display: block !important;

            font-size: 7px !important;

            letter-spacing: 3px !important;

            color: #b8945f !important;

        }


        #cartPanel #closeCart {

            width: 28px !important;

            height: 28px !important;

            padding: 0 !important;

            border: 0 !important;

            background: transparent !important;

            color: #333 !important;

            font-size: 18px !important;

            cursor: pointer !important;

        }


        #cartPanel #cartItems {

            flex:
                1 1 auto !important;

            min-height: 0 !important;

            width: 100% !important;

            box-sizing: border-box !important;

            overflow-x: hidden !important;

            overflow-y: auto !important;

            padding:
                10px 14px !important;

            background: #fffdf9 !important;

        }


        #cartPanel .cart-item {

            width: 100% !important;

            box-sizing: border-box !important;

            display: grid !important;

            grid-template-columns:
                52px
                minmax(0,1fr)
                20px !important;

            gap: 10px !important;

            align-items: start !important;

            padding:
                10px 0 14px !important;

            margin:
                0 0 10px !important;

            border-bottom:
                1px solid #dedbd5 !important;

        }


        #cartPanel .cart-item-image {

            width: 52px !important;

            height: 52px !important;

            overflow: hidden !important;

            background: #eee !important;

        }


        #cartPanel .cart-item-image img {

            width: 100% !important;

            height: 100% !important;

            object-fit: cover !important;

            display: block !important;

        }


        #cartPanel .cart-item-info {

            min-width: 0 !important;

        }


        #cartPanel .cart-item-info h4 {

            margin:
                0 0 5px !important;

            font-family:
                Georgia,
                serif !important;

            font-size: 12px !important;

            font-weight: normal !important;

            line-height: 1.3 !important;

            color: #222 !important;

        }


        #cartPanel .cart-item-info > span {

            display: block !important;

            margin-bottom: 7px !important;

            font-size: 9px !important;

            color: #b8945f !important;

        }


        #cartPanel .cart-quantity {

            display: flex !important;

            align-items: center !important;

            gap: 5px !important;

        }


        #cartPanel .cart-quantity button {

            width: 18px !important;

            height: 18px !important;

            padding: 0 !important;

            border:
                1px solid #ddd !important;

            background: #fff !important;

            color: #333 !important;

            font-size: 10px !important;

            cursor: pointer !important;

        }


        #cartPanel .cart-quantity strong {

            min-width: 14px !important;

            text-align: center !important;

            font-size: 10px !important;

            font-weight: normal !important;

        }


        #cartPanel .remove-cart {

            width: 20px !important;

            height: 20px !important;

            padding: 0 !important;

            border: 0 !important;

            background: transparent !important;

            color: #777 !important;

            font-size: 13px !important;

            cursor: pointer !important;

        }


        #cartPanel .empty-cart {

            padding:
                65px 10px !important;

            text-align: center !important;

        }


        #cartPanel .empty-cart p {

            margin:
                0 0 10px !important;

            font-size: 7px !important;

            letter-spacing: 3px !important;

            color: #b8945f !important;

        }


        #cartPanel .empty-cart span {

            font-size: 9px !important;

            color: #888 !important;

        }


        #cartPanel .cart-footer {

            position: relative !important;

            flex:
                0 0 auto !important;

            width: 100% !important;

            box-sizing: border-box !important;

            padding:
                14px 10px 12px !important;

            margin: 0 !important;

            background: #fffdf9 !important;

            border-top:
                1px solid #dedbd5 !important;

            z-index: 5 !important;

        }


        #cartPanel .cart-total-row {

            width: 100% !important;

            display: flex !important;

            align-items: center !important;

            justify-content: space-between !important;

            margin:
                0 0 14px !important;

        }


        #cartPanel .cart-total-row span {

            font-size: 7px !important;

            letter-spacing: 3px !important;

            color: #777 !important;

        }


        #cartPanel #cartTotal {

            font-family:
                Georgia,
                serif !important;

            font-size: 16px !important;

            font-weight: bold !important;

            color: #b8945f !important;

            white-space: nowrap !important;

        }


        #cartPanel #checkoutWhatsApp,
        #cartPanel #checkoutTelegram {

            display: flex !important;

            align-items: center !important;

            justify-content: center !important;

            width: 100% !important;

            height: 38px !important;

            min-height: 38px !important;

            box-sizing: border-box !important;

            margin: 0 !important;

            padding: 0 !important;

            border: 0 !important;

            border-radius: 0 !important;

            font-family:
                inherit !important;

            font-size: 7px !important;

            font-weight: bold !important;

            letter-spacing: 2px !important;

            text-transform: uppercase !important;

            cursor: pointer !important;

        }


        #cartPanel #checkoutWhatsApp {

            background:
                #3f4144 !important;

            color:
                #ffffff !important;

            margin-bottom:
                2px !important;

        }


        #cartPanel #checkoutTelegram {

            background:
                #d5b06b !important;

            color:
                #ffffff !important;

        }


        footer.site-footer,
        footer {

            position:
                relative !important;

            z-index:
                1 !important;

        }


        @media (max-width: 600px) {

            #cartPanel {

                width: 100vw !important;

                max-width: 100vw !important;

            }

        }

    `;


    document.head.appendChild(
        finalCartStyle
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderCart();

    filterProducts();

    fixCheckoutButtons();


    console.log(
        "DEE GELVI STORE — JavaScript berhasil dimuat."
    );

});
