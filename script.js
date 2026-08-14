/* =========================================================
   DEE GELVI STORE
   FULL JAVASCRIPT
   VERSION CLEAN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

    const products = {

        noir: {
            name: "NOAM THE GENTLE",
            category: "MEN",
            collection: "DEE GELVI ORIGINAL",
            description: "Aroma maskulin, dark, elegant, dan berkarakter.",
            notes: "Woody • Musk • Dark • Elegant",
            price: 199000,
            image: "images/noam.jpg"
        },

        royale: {
            name: "FELIX EXCLUSIVE",
            category: "MEN",
            collection: "DEE GELVI ORIGINAL",
            description: "Fresh, sophisticated, dan cocok untuk acara spesial.",
            notes: "Fresh • Sophisticated • Elegant",
            price: 199000,
            image: "images/felix.jpg"
        },

        velvet: {
            name: "VAN URBAN VOYAGER",
            category: "WOMEN",
            collection: "DEE GELVI ORIGINAL",
            description: "Lembut, sensual, feminine, dan elegan.",
            notes: "Floral • Soft • Sensual • Feminine",
            price: 199000,
            image: "images/van.jpg"
        },

        amber: {
            name: "DEE GELVI AMBER",
            category: "UNISEX",
            collection: "DEE GELVI ORIGINAL",
            description: "Warm amber dengan karakter mewah dan timeless.",
            notes: "Amber • Warm • Woody • Timeless",
            price: 289000,
            image: "images/perfume4.jpg"
        },

        shadow: {
            name: "SHADOW MAN",
            category: "MEN",
            collection: "DEE GELVI ORIGINAL",
            description: "Dark, woody, maskulin, dan berkarakter kuat.",
            notes: "Dark • Woody • Masculine • Strong",
            price: 299000,
            image: "images/shadow.jpg"
        },

        bloom: {
            name: "DEE GELVI BLOOM",
            category: "WOMEN",
            collection: "DEE GELVI ORIGINAL",
            description: "Floral, fresh, manis, dan memorable.",
            notes: "Floral • Fresh • Sweet • Memorable",
            price: 269000,
            image: "images/perfume6.jpg"
        },

        curated1: {
            name: "CURATED FRAGRANCE ONE",
            category: "MEN",
            collection: "CURATED COLLECTION",
            description: "Selected fragrance dari koleksi pilihan DEE GELVI.",
            notes: "Selected • Elegant • Character",
            price: 299000,
            image: "images/curated1.jpg"
        },

        curated2: {
            name: "CURATED FRAGRANCE TWO",
            category: "WOMEN",
            collection: "CURATED COLLECTION",
            description: "Selected fragrance dengan karakter elegan.",
            notes: "Elegant • Soft • Sophisticated",
            price: 299000,
            image: "images/curated2.jpg"
        }

    };


    /* =====================================================
       HELPER
    ===================================================== */

    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    function formatPrice(price) {

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(price);

    }


    /* =====================================================
       CART
    ===================================================== */

    let cart = [];

    try {

        const savedCart =
            localStorage.getItem("deeGelviCart");

        if (savedCart) {
            cart = JSON.parse(savedCart);
        }

    } catch (error) {

        console.warn("Cart tidak dapat dimuat.");
        cart = [];

    }


    function saveCart() {

        localStorage.setItem(
            "deeGelviCart",
            JSON.stringify(cart)
        );

    }


    function updateCartCount() {

        const cartCount = $("#cartCount");

        if (!cartCount) return;

        const totalQuantity = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalQuantity;

    }


    function addToCart(productId) {

        const product = products[productId];

        if (!product) {

            console.warn(
                "Produk tidak ditemukan:",
                productId
            );

            return;
        }

        const existingProduct =
            cart.find(item => item.id === productId);

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });

        }

        saveCart();
        updateCartCount();
        renderCart();

        showNotification(
            `${product.name} ditambahkan ke shopping bag.`
        );

    }


    function removeFromCart(productId) {

        cart = cart.filter(
            item => item.id !== productId
        );

        saveCart();
        updateCartCount();
        renderCart();

    }


    function changeQuantity(productId, amount) {

        const item =
            cart.find(product => product.id === productId);

        if (!item) return;

        item.quantity += amount;

        if (item.quantity <= 0) {

            removeFromCart(productId);
            return;

        }

        saveCart();
        updateCartCount();
        renderCart();

    }


    function renderCart() {

        const cartItems = $("#cartItems");
        const cartTotal = $("#cartTotal");

        if (!cartItems || !cartTotal) return;

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>YOUR BAG IS EMPTY</p>
                    <span>
                        Pilih fragrance favorit kamu.
                    </span>
                </div>
            `;

            cartTotal.textContent = "Rp0";

            return;
        }

        let total = 0;

        cartItems.innerHTML = cart.map(item => {

            const subtotal =
                item.price * item.quantity;

            total += subtotal;

            return `
                <div class="cart-item">

                    <div class="cart-item-image">
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >
                    </div>

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <span>
                            ${formatPrice(item.price)}
                        </span>

                        <div class="cart-quantity">

                            <button
                                type="button"
                                class="quantity-minus"
                                data-id="${item.id}"
                            >
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                type="button"
                                class="quantity-plus"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        type="button"
                        class="remove-cart"
                        data-id="${item.id}"
                    >
                        ×
                    </button>

                </div>
            `;

        }).join("");

        cartTotal.textContent =
            formatPrice(total);


        $$(".quantity-minus").forEach(button => {

            button.addEventListener("click", () => {

                changeQuantity(
                    button.dataset.id,
                    -1
                );

            });

        });


        $$(".quantity-plus").forEach(button => {

            button.addEventListener("click", () => {

                changeQuantity(
                    button.dataset.id,
                    1
                );

            });

        });


        $$(".remove-cart").forEach(button => {

            button.addEventListener("click", () => {

                removeFromCart(
                    button.dataset.id
                );

            });

        });

    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    $$(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            addToCart(
                button.dataset.product
            );

        });

    });


    /* =====================================================
       CART PANEL
    ===================================================== */

    const cartPanel = $("#cartPanel");
    const cartOverlay = $("#cartOverlay");
    const openCart = $("#openCart");
    const closeCart = $("#closeCart");


    function openCartPanel() {

        if (!cartPanel) return;

        cartPanel.classList.add("active");

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }

        document.body.classList.add("cart-open");

    }


    function closeCartPanel() {

        if (!cartPanel) return;

        cartPanel.classList.remove("active");

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

        document.body.classList.remove("cart-open");

    }


    if (openCart) {
        openCart.addEventListener(
            "click",
            openCartPanel
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
       MOBILE MENU
    ===================================================== */

    const mobileMenuButton =
        $("#mobileMenuButton");

    const mobileMenu =
        $("#mobileMenu");


    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "active"
                );

            }
        );


        $$("#mobileMenu a").forEach(link => {

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
       PRODUCT MODAL
    ===================================================== */

    const productModal = $("#productModal");
    const modalImage = $("#modalImage");
    const modalName = $("#modalName");
    const modalCategory = $("#modalCategory");
    const modalCollection = $("#modalCollection");
    const modalDescription = $("#modalDescription");
    const modalNotes = $("#modalNotes");
    const modalPrice = $("#modalPrice");
    const modalAddCart = $("#modalAddCart");

    let currentModalProduct = null;


    function openProductModal(productId) {

        const product = products[productId];

        if (!product) {

            console.warn(
                "Produk tidak ditemukan:",
                productId
            );

            return;
        }

        currentModalProduct = productId;

        if (modalImage) {
            modalImage.src = product.image;
            modalImage.alt = product.name;
        }

        if (modalName) {
            modalName.textContent = product.name;
        }

        if (modalCategory) {
            modalCategory.textContent = product.category;
        }

        if (modalCollection) {
            modalCollection.textContent = product.collection;
        }

        if (modalDescription) {
            modalDescription.textContent =
                product.description;
        }

        if (modalNotes) {
            modalNotes.innerHTML =
                `<span>${product.notes}</span>`;
        }

        if (modalPrice) {
            modalPrice.textContent =
                formatPrice(product.price);
        }

        if (productModal) {

            productModal.classList.add("active");

            productModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );

        }

    }


    function closeProductModal() {

        if (!productModal) return;

        productModal.classList.remove("active");

        productModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        currentModalProduct = null;

    }


    $$(".quick-view").forEach(button => {

        button.addEventListener("click", () => {

            openProductModal(
                button.dataset.product
            );

        });

    });


    if (modalAddCart) {

        modalAddCart.addEventListener(
            "click",
            () => {

                if (!currentModalProduct) return;

                addToCart(
                    currentModalProduct
                );

                closeProductModal();
                openCartPanel();

            }
        );

    }


    if (productModal) {

        productModal.addEventListener(
            "click",
            event => {

                if (event.target === productModal) {
                    closeProductModal();
                }

            }
        );

    }


    /* =====================================================
       CLOSE BUTTONS
    ===================================================== */

    $$("[data-close]").forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.close;

            if (targetId === "productModal") {
                closeProductModal();
            }

            if (targetId === "searchModal") {
                closeSearchModal();
            }

        });

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchModal = $("#searchModal");
    const searchButton = $("#searchButton");
    const searchInput = $("#searchInput");
    const productSearch = $("#productSearch");


    function openSearchModal() {

        if (!searchModal) return;

        searchModal.classList.add("active");

        searchModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        setTimeout(() => {

            if (searchInput) {
                searchInput.focus();
            }

        }, 100);

    }


    function closeSearchModal() {

        if (!searchModal) return;

        searchModal.classList.remove("active");

        searchModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            openSearchModal
        );

    }


    if (searchModal) {

        searchModal.addEventListener(
            "click",
            event => {

                if (event.target === searchModal) {
                    closeSearchModal();
                }

            }
        );

    }


    /* =====================================================
       PRODUCT FILTER
    ===================================================== */

    const categoryButtons =
        $$(".category");

    const productCards =
        $$(".product-card");

    const noResult =
        $("#noResult");

    let activeFilter = "all";


    function filterProducts() {

        const searchValue =
            productSearch
                ? productSearch.value
                    .trim()
                    .toLowerCase()
                : "";

        let visibleProducts = 0;


        productCards.forEach(card => {

            const name =
                (card.dataset.name || "")
                    .toLowerCase();

            const category =
                (card.dataset.category || "")
                    .toLowerCase();

            const collection =
                (card.dataset.collection || "")
                    .toLowerCase();


            let collectionMatch = true;

            let categoryMatch = true;


            if (activeFilter === "dee-gelvi") {

                collectionMatch =
                    collection === "dee-gelvi";

            }


            if (activeFilter === "curated") {

                collectionMatch =
                    collection === "curated";

            }


            if (
                ["men", "women", "unisex"]
                    .includes(activeFilter)
            ) {

                categoryMatch =
                    category === activeFilter;

            }


            const searchMatch =
                name.includes(searchValue) ||
                category.includes(searchValue) ||
                collection.includes(searchValue);


            const show =
                collectionMatch &&
                categoryMatch &&
                searchMatch;


            card.style.display =
                show ? "" : "none";


            if (show) {
                visibleProducts++;
            }

        });


        if (noResult) {

            noResult.hidden =
                visibleProducts !== 0;

        }

    }


    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                activeFilter =
                    button.dataset.filter ||
                    "all";

                filterProducts();

            }
        );

    });


    if (productSearch) {

        productSearch.addEventListener(
            "input",
            filterProducts
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

                if (event.key === "Enter") {

                    closeSearchModal();

                    const shop = $("#shop");

                    if (shop) {

                        shop.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }

            }
        );

    }


    /* =====================================================
       CHECKOUT MESSAGE
    ===================================================== */

    function getCartMessage() {

        if (cart.length === 0) {
            return null;
        }

        let total = 0;

        let message =
            "Halo DEE GELVI, saya ingin memesan:\n\n";


        cart.forEach((item, index) => {

            const subtotal =
                item.price * item.quantity;

            total += subtotal;

            message +=
                `${index + 1}. ${item.name}\n` +
                `Qty: ${item.quantity}\n` +
                `Harga: ${formatPrice(item.price)}\n\n`;

        });


        message +=
            `TOTAL: ${formatPrice(total)}\n\n`;

        message +=
            "Mohon info ketersediaan dan proses pemesanannya. Terima kasih.";


        return message;

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    const checkoutWhatsApp =
        $("#checkoutWhatsApp");


    if (checkoutWhatsApp) {

        checkoutWhatsApp.addEventListener(
            "click",
            () => {

                const message =
                    getCartMessage();

                if (!message) {

                    showNotification(
                        "Shopping bag masih kosong."
                    );

                    return;

                }


                const phone =
                    "6281234567890";


                const url =
                    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


                window.open(
                    url,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       TELEGRAM CHECKOUT
    ===================================================== */

    const checkoutTelegram =
        $("#checkoutTelegram");


    if (checkoutTelegram) {

        checkoutTelegram.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    showNotification(
                        "Shopping bag masih kosong."
                    );

                    return;

                }


                window.open(
                    "https://t.me/NewEra889",
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       CONTACT VIA TELEGRAM
    ===================================================== */

    const telegramContact =
        $("#telegramContact");


    if (telegramContact) {

        telegramContact.addEventListener(
            "click",
            () => {

                window.open(
                    "https://t.me/NewEra889",
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notification =
        $("#cartNotification");

    let notificationTimer;


    function showNotification(message) {

        if (!notification) return;

        notification.textContent =
            message;

        notification.classList.add("show");

        clearTimeout(
            notificationTimer
        );

        notificationTimer =
            setTimeout(() => {

                notification.classList.remove(
                    "show"
                );

            }, 2500);

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeProductModal();
                closeSearchModal();
                closeCartPanel();

            }

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       IMAGE ERROR
    ===================================================== */

    $$("img").forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Gambar tidak ditemukan:",
                    image.src
                );

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    updateCartCount();

    

    filterProducts();


    console.log(
        "DEE GELVI STORE — JavaScript Loaded Successfully."
    );

});
