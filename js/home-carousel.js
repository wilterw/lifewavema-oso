// js/home-carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.getElementById('home-product-carousel');

    // Verificar si estamos en una página que contiene el carrusel
    if (carouselWrapper) {
        
        // 1. Generar los slides dinámicamente desde la base de datos de productos.js
        productos.forEach(producto => {
            // Usamos una versión simplificada de la tarjeta para el carrusel
            const slideHTML = `
                <div class="swiper-slide">
                    <div class="product-card-promo">
                        <a href="${producto.pagina}" class="product-card-link">
                            <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
                            <div>
                                <h3>${producto.nombre}</h3>
                                <p>${producto.descripcion}</p>
                            </div>
                        </a>
                        <div class="product-card-buttons">
                           <a href="${producto.pagina}" class="btn-secondary">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            `;
            carouselWrapper.innerHTML += slideHTML;
        });

        // 2. Inicializar Swiper.js una vez que los slides están en el HTML
        const swiper = new Swiper('.product-carousel', {
            loop: true, // El carrusel es infinito
            autoplay: {
                delay: 4000, // Cambia de slide cada 4 segundos
                disableOnInteraction: false, // Sigue automático después de que el usuario interactúe
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true, // Se puede hacer clic en los puntos de paginación
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // Configuración para mostrar diferente número de slides según el tamaño de la pantalla
            breakpoints: {
                // Para móviles pequeños: 1 slide
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // Para tablets: 2 slides
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // Para escritorios: 3 slides
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }
});