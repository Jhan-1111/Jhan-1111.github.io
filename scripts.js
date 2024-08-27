// Función para abrir/cerrar el sidebar (barra de información adicional)
function toggleSidePanel() {
    const sidePanel = document.getElementById("sidePanel");
    sidePanel.classList.toggle("open"); // Cambia entre añadir o eliminar la clase "open"
}

// Función para comprar promociones
    function selectCombo() {
        const combo = document.getElementById('combo-select').value;

        // Desglosar la información del combo
        const [name, price] = combo.split(' - Bs. ');

        // Obtener el carrito desde localStorage (o inicializarlo si está vacío)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Crear un objeto del producto
        const selectedProduct = {
            name: name.trim(),
            price: parseFloat(price.trim()),
            quantity: 1 // Por defecto, la cantidad es 1
        };

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.name === selectedProduct.name);

        if (existingProductIndex > -1) {
            // Si el producto ya está en el carrito, solo aumentar la cantidad
            cart[existingProductIndex].quantity += 1;
        } else {
            // Si no está en el carrito, agregar el nuevo producto
            cart.push(selectedProduct);
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirigir a la página del carrito
        window.location.href = 'cart.html';
    }



// Función para hacer scroll suave a una sección específica
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Maneja el envío del formulario de contacto
document
    .getElementById("contactForm")
    ?.addEventListener("submit", function (event) {  // Añadir ? para verificar si el elemento existe
        event.preventDefault();
        alert(
            "Gracias por contactarnos. Nos pondremos en contacto contigo pronto."
        );
        this.reset();
    });

// Inicializa el carrito desde localStorage, si existe
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para agregar un producto al carrito
function addToCart(productName, price) {
    const product = cart.find((item) => item.name === productName);

    if (product) {
        product.quantity += 1; // Si el producto ya está en el carrito, incrementa la cantidad
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // Si no está, lo agrega
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el carrito en localStorage

    alert(`${productName} ha sido agregado al carrito.`);
}

// Cargar los productos en la página del carrito
function loadCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceContainer = document.getElementById("totalPrice");

    if (!cartItemsContainer || !totalPriceContainer) {
        return; // Salir si los elementos no existen en el DOM
    }

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.className = "cart-item";
        productElement.innerHTML = `
            <span>${product.name}</span>
            <span>Bs. ${product.price} x ${product.quantity}</span>
            <span>Total: Bs. ${(product.price * product.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(productElement);

        totalPrice += product.price * product.quantity;
    });

    totalPriceContainer.textContent = `Total a pagar: Bs. ${totalPrice.toFixed(2)}`;
}

// Función para manejar el proceso de compra
function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert(
        "Gracias por tu compra! El total es: Bs. " +
            cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
    );
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Cargar el carrito en la página de carrito cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("cartItems")) {
        loadCart();
    }
});

// Manejar la apertura/cierre del sidebar
document.getElementById("openSidebarBtn")?.addEventListener("click", toggleSidePanel);

// Ejemplo de cómo agregar un producto (esta función se llamaría al hacer clic en "Agregar al Carrito")
function exampleAddProduct() {
    addToCart('Computadora Gaming', 5500);
    addToCart('Teclado Mecánico', 350);
}

// Si tienes un botón de ejemplo para agregar productos (esto es solo para demostrar)
document.getElementById("exampleAddBtn")?.addEventListener("click", exampleAddProduct);

// Carrusel de Imágenes
let currentIndex = 0;

function moveCarousel(step) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    currentIndex += step;

    if (currentIndex >= totalItems) {
        currentIndex = 0;  // Regresar al primer elemento
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;  // Ir al último elemento
    }

    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Redirección al carrito al hacer clic en el ícono
document.getElementById('cartIcon')?.addEventListener('click', function() {
    window.location.href = 'cart.html'; // Cambia 'cart.html' a la URL de tu página del carrito
});




document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Obtener los valores del formulario
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // Crear el mensaje que se enviará por WhatsApp
    let whatsappMessage = `Hola, mi nombre es ${name}. Mi correo es ${email}. Quisiera decir lo siguiente:\n\n${message}`;

    // Crear el enlace para enviar el mensaje a WhatsApp
    let whatsappURL = `https://wa.me/59178828462?text=${encodeURIComponent(whatsappMessage)}`;

    // Abrir WhatsApp en una nueva ventana
    window.open(whatsappURL, '_blank');

    // Mostrar un mensaje de éxito
    alert("Gracias por contactarnos. Nos pondremos en contacto contigo pronto.");
});

let currentSlidePrincipal = 0;

function showNextSlidePrincipal() {
    const slides = document.querySelectorAll('.carousel-principal .carousel-images img');
    const totalSlides = slides.length;

    currentSlidePrincipal = (currentSlidePrincipal + 1) % totalSlides;
    document.querySelector('.carousel-principal .carousel-images').style.transform = `translateX(-${currentSlidePrincipal * 100}%)`;
}

// Cambia la imagen automáticamente cada 3 segundos
setInterval(showNextSlidePrincipal, 3000);







