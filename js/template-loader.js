// js/template-loader.js

document.addEventListener("DOMContentLoaded", function() {
    
    const loadTemplate = (url, elementId) => {
        return fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(`Error al cargar ${url}`))
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) element.innerHTML = data;
            });
    };

    const initializeSiteInteractivity = () => {
        if (typeof populateAffiliateData === 'function') {
            populateAffiliateData();
        }
        if (typeof createFloatingWhatsAppButton === 'function') {
            createFloatingWhatsAppButton();
        }

        const mobileNavToggle = document.getElementById('mobile-nav-toggle');
        const mobileMenuPanel = document.getElementById('mobile-menu-panel');
        const bodyOverlay = document.getElementById('body-overlay');

        if (mobileNavToggle && mobileMenuPanel && bodyOverlay) {
            mobileNavToggle.addEventListener('click', () => {
                mobileNavToggle.classList.toggle('is-active');
                mobileMenuPanel.classList.toggle('is-open');
                bodyOverlay.classList.toggle('is-active');
                document.body.style.overflow = mobileMenuPanel.classList.contains('is-open') ? 'hidden' : '';
            });

            bodyOverlay.addEventListener('click', () => {
                mobileNavToggle.classList.remove('is-active');
                mobileMenuPanel.classList.remove('is-open');
                bodyOverlay.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        }
        
        const mobileDropdownToggle = document.getElementById('mobile-dropdown-toggle');
        const mobileSubmenu = document.getElementById('mobile-submenu');

        if (mobileDropdownToggle && mobileSubmenu) {
            mobileDropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                mobileSubmenu.classList.toggle('is-open');
            });
        }

        const contactButtonNav = document.getElementById('contact-button-nav');
        const mobileContactButton = document.getElementById('mobile-contact-button');
        const contactModal = document.getElementById('contact-modal');
        const closeModalButton = document.getElementById('close-contact-modal');
        
        const openContactModal = (e) => {
            e.preventDefault();
            if (contactModal) contactModal.style.display = 'flex';
        };

        if (contactButtonNav) contactButtonNav.addEventListener('click', openContactModal);
        if (mobileContactButton) mobileContactButton.addEventListener('click', openContactModal);

        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => contactModal.style.display = 'none');
        }
        if (contactModal) {
            contactModal.addEventListener('click', (e) => {
                if (e.target === contactModal) contactModal.style.display = 'none';
            });
        }
    };

    Promise.all([
        loadTemplate('/header.html', 'main-header'),
        loadTemplate('/footer.html', 'main-footer')
    ])
    .then(initializeSiteInteractivity)
    .catch(error => console.error('Error en la carga de la plantilla:', error));
});