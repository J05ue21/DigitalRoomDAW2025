document.addEventListener('DOMContentLoaded', function() {

    // --- Menú de Navegación Móvil (Hamburguesa) ---
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Carrito con Contador ---
    const cartCounter = document.getElementById('cartCounter');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    let itemCount = parseInt(localStorage.getItem('cartItemCount') || '0'); // Cargar contador del localStorage
    
    function updateCartDisplay() {
        if (cartCounter) {
            cartCounter.textContent = itemCount;
        }
    }
    updateCartDisplay(); // Mostrar al cargar

    if (cartCounter) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                itemCount++;
                localStorage.setItem('cartItemCount', itemCount); // Guardar en localStorage
                updateCartDisplay();
                cartCounter.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCounter.style.transform = 'scale(1)';
                }, 200);
                console.log(`Producto ID: ${button.dataset.id} añadido al carrito.`);
                // Aquí podrías agregar el producto a una lista más compleja en localStorage si es necesario
            });
        });
    }


    // --- Buscador con Sugerencias (simple, usa datalist de HTML) ---
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            console.log("Buscador enfocado, mostrando sugerencias (datalist).");
        });
    }

    // --- Temporizadores de Oferta ---
    function startOfferTimer(timerElement) {
        const endTimeString = timerElement.dataset.endtime;
        if (!endTimeString) {
            console.warn("Elemento timer no tiene data-endtime:", timerElement);
            return;
        }
        const endTime = new Date(endTimeString).getTime();
        if (isNaN(endTime)) {
            console.warn("Fecha inválida para el timer:", endTimeString, timerElement);
            timerElement.innerHTML = "Configuración de oferta inválida.";
            return;
        }


        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(interval);
                timerElement.innerHTML = "¡Oferta Expirada!";
                // Ocultar o cambiar estilo de la sección de la oferta
                const offerCard = timerElement.closest('.offer-card');
                if (offerCard) {
                    offerCard.style.opacity = '0.7';
                    offerCard.style.pointerEvents = 'none'; // Deshabilitar interacción
                }
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysEl = timerElement.querySelector('.days');
            const hoursEl = timerElement.querySelector('.hours');
            const minutesEl = timerElement.querySelector('.minutes');
            const secondsEl = timerElement.querySelector('.seconds');

            if(daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if(hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if(minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if(secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer(); 
    }

    const offerTimers = document.querySelectorAll('.offer-timer');
    offerTimers.forEach(timer => {
        startOfferTimer(timer);
    });

    // --- Filtros Rápidos (Feedback Visual) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            console.log(`Filtro aplicado: Tipo=${button.dataset.filterType}, Valor=${button.dataset.filterValue}`);
            // Lógica de filtrado de juegos iría aquí.
            // Por ejemplo, podrías añadir/quitar clases a las .game-card
            // basadas en data-attributes que coincidan con el filtro.
        });
    });

    // --- Botones de Login/Registro (simulación) ---
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => alert('Redirigiendo a Login... (simulación)'));
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', () => alert('Redirigiendo a Registro... (simulación)'));
    }

    // --- Actualizar Año en Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Newsletter Form ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            if (emailInput && emailInput.value) {
                alert(`Gracias por suscribirte con ${emailInput.value}! (Simulación)`);
                emailInput.value = ''; // Limpiar campo
            } else {
                alert('Por favor, ingresa un email válido.');
            }
        });
    }

    // --- Animación suave al hacer scroll a secciones (opcional) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute && hrefAttribute.startsWith('#') && hrefAttribute.length > 1) {
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    e.preventDefault();
                    // Ajuste para la altura del header fijo si es necesario
                    const headerOffset = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 10; // 10px de margen extra

                    window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                    });

                    // Si el menú móvil está activo, cerrarlo
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // --- Animación para las tarjetas al cargar (si están visibles) ---
    const animatedElements = document.querySelectorAll('.game-card, .offer-card, .hero-content, .filter-group');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUpCard 0.6s ${entry.target.dataset.delay || '0s'} ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0'; 
        // Aplicar delay solo a tarjetas para efecto escalonado, otros elementos pueden aparecer antes.
        if (el.classList.contains('game-card') || el.classList.contains('offer-card')) {
             el.dataset.delay = `${index * 0.08}s`;
        } else {
            el.dataset.delay = '0s'; // O un delay más pequeño para elementos grandes
        }
        observer.observe(el);
    });

    // Inyectar keyframes si no está en CSS (mejor en CSS)
    if (!document.getElementById('fadeInUpCardKeyframes')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = "fadeInUpCardKeyframes";
        styleSheet.type = "text/css";
        styleSheet.innerText = `@keyframes fadeInUpCard { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }`;
        document.head.appendChild(styleSheet);
    }
});