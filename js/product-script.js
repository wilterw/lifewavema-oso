document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE LA GALERÍA DE IMÁGENES ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Quita la clase 'active' de la miniatura anterior
                document.querySelector('.thumbnail-images .thumbnail.active').classList.remove('active');
                // Añade 'active' a la miniatura en la que se hizo clic
                this.classList.add('active');
                // Cambia la imagen principal
                mainImage.src = this.src;
            });
        });
    }

    // --- LÓGICA PARA EL BOTÓN DE COMPRA ---
    const buyButton = document.getElementById('buy-button');
    const productId = document.body.getAttribute('data-product-id');

    if (buyButton && productId) {
        // Buscar el enlace de compra en nuestra base de datos 'config.js'
        const productLink = productLinks[productId];

        if (productLink) {
            buyButton.href = productLink;
        } else {
            // Si no se encuentra el enlace, podemos ocultar el botón o dirigir a una página general
            console.warn(`No se encontró un enlace de compra para el producto con ID: ${productId}`);
            buyButton.href = affiliateData.affiliateLink; // Dirige al enlace general del afiliado
        }
    }
});
