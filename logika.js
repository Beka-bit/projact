document.addEventListener("DOMContentLoaded", function () {
    // Тіркелу формасы
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();

            if (!username || !email || !password) {
                alert("Барлық жолдарды толтырыңыз!");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify({ username, email }));
            alert("Тіркелу сәтті аяқталды!");
            window.location.href = "index.html";
        });
    }

    // Қолданушы аты және шығу батырмасы
    const signOrder = document.getElementById("signOrder");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && signOrder) {
        signOrder.textContent = currentUser.username;
        signOrder.href = "#";
        signOrder.addEventListener("click", function () {
            if (confirm("Шығу жасағыңыз келе ме?")) {
                localStorage.removeItem("currentUser");
                window.location.reload();
            }
        });
    }

    // Бетке бағыттайтын батырмалар
    const pageLinks = {
        indexBtn:"index.html",
        mensBnt: "mans.html",
        wemansBtn: "contact.html",
        cards: "by.html"
    };

    Object.keys(pageLinks).forEach(id => {
        document.getElementById(id)?.addEventListener("click", function () {
            window.location.href = pageLinks[id];
        });
    });


    // Іздеу функциясы
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", function (event) {
            event.preventDefault();
            let searchText = document.querySelector("#form input").value.toLowerCase();
            document.querySelectorAll("#products div").forEach(product => {
                let productName = product.querySelector("h4").textContent.toLowerCase();
                product.style.display = productName.includes(searchText) ? "block" : "none";
            });
        });
    }

    // Пікірлер бөлімі
    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let commentInput = document.querySelector("#commentForm input");
            let commentText = commentInput.value.trim();
            if (!commentText) {
                alert("Пікір бос болмауы керек!");
                return;
            }
            let commentSection = document.getElementById("your-comment");
            let newComment = document.createElement("p");
            newComment.textContent = commentText;
            commentSection.appendChild(newComment);
            commentInput.value = "";
        });
    }

    // Өнімдерді жүктеу
    async function getProducts() {
        try {
            let response = await fetch("http://localhost:3000/products");
            if (!response.ok) throw new Error("Сервер жауап бермеді.");
            let data = await response.json();
            displayProducts(data.products);
        } catch (error) {
            console.error("Қате:", error);
        }
    }

    function displayProducts(products) {
        let productContainer = document.getElementById("products");
        if (!productContainer) return;
        productContainer.innerHTML = "";

        products.forEach(product => {
            let productDiv = document.createElement("div");
            productDiv.className = "product-item";
            productDiv.innerHTML = `
                <img src="${product.productImage}" alt="${product.productName}">
                <h4>${product.productName}</h4>
                <p>Баға: ${product.price} тг</p>
                <button onclick="getProductById('${product.idProduct}')">Толығырақ</button>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    async function getProductById(productId) {
        try {
            let response = await fetch(`http://localhost:3000/products/${productId}`);
            if (!response.ok) throw new Error("Өнім табылмады.");
            let product = await response.json();
            console.log("Таңдалған өнім:", product);
        } catch (error) {
            console.error("Қате:", error);
        }
    }

    // "Сатып алу" батырмалары
    document.querySelectorAll("#womenBy").forEach(button => {
        button.addEventListener("click", function () {
            let productBox = this.closest("#womenBox");
            if (!productBox) return;

            let imgSrc = productBox.querySelector("img").src;
            let price = productBox.querySelector("h4").innerText;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ image: imgSrc, price: price });
            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Өнім себетке қосылды!");
        });
    });

    // "Менің тауарларым" бетіне өту
    document.getElementById("myCart")?.addEventListener("click", function () {
        window.location.href = "by.html";
    });
});

document.getElementById("index").addEventListener('click', function(){
    window.location.href = "index.html"
})

document.querySelectorAll("#addToCart").forEach(button => {
    button.addEventListener("click", function () {
        let productBox = this.closest("#womenBox");
        if (!productBox) return;

        let imgSrc = productBox.querySelector("img").src;
        let price = productBox.querySelector("h4").innerText;

        let cart = JSON.parse(localStorage.getItem("card        ")) || [];
        cart.push({ image: imgSrc, price: price });
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Өнім себетке қосылды!");
    });
});

document.querySelectorAll("#mansBy").forEach(button => {
    button.addEventListener("click", function () {
        let productBox = this.closest("#mansBox");
        if (!productBox) return;

        let imgSrc = productBox.querySelector("img").src;
        let price = productBox.querySelector("h4").innerText;

        let cart = JSON.parse(localStorage.getItem("card        ")) || [];
        cart.push({ image: imgSrc, price: price });
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Өнім себетке қосылды!");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Іздеу функциясы
    const searchInput = document.querySelector("#form input");
    const searchButton = document.querySelector("#searchBtn");
    const productItems = document.querySelectorAll("#products div");

    searchButton.addEventListener("click", function (e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        productItems.forEach(item => {
            const title = item.querySelector("h4").innerText.toLowerCase();
            if (title.includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Пікір қосу функциясы
    const commentForm = document.querySelector("#commentForm");
    const commentInput = document.querySelector("#commentForm input");
    const commentsSection = document.querySelector("#comments");

    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
            const newComment = document.createElement("p");
            newComment.textContent = commentText;
            newComment.style.background = "#f4f4f4";
            newComment.style.padding = "10px";
            newComment.style.borderRadius = "5px";
            newComment.style.marginTop = "5px";
            commentsSection.appendChild(newComment);
            commentInput.value = ""; // Инпутты тазалау
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    // Инициализация поиска
    const searchInput = document.querySelector("#form input");
    const searchButton = document.querySelector("#searchBtn");
    const productItems = document.querySelectorAll("#products div");

    searchButton?.addEventListener("click", function (e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        productItems.forEach(item => {
            const title = item.querySelector("h4").innerText.toLowerCase();
            item.style.display = title.includes(query) ? "block" : "none";
        });
    });

    // Форма добавления комментариев
    const commentForm = document.querySelector("#commentForm");
    const commentInput = document.querySelector("#commentForm input");
    const commentsSection = document.querySelector("#comments");

    commentForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
            const newComment = document.createElement("p");
            newComment.textContent = commentText;
            newComment.style.background = "#f4f4f4";
            newComment.style.padding = "10px";
            newComment.style.borderRadius = "5px";
            newComment.style.marginTop = "5px";
            commentsSection.appendChild(newComment);
            commentInput.value = "";
        }
    });

    // Функция добавления в );
});

