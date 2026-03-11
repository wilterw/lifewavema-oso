// js/script.js

document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // ===    CONTROL MAESTRO DEL MENÚ        ===
    // ==========================================
    
    // Usamos un solo "Oído" (Listener) para todo el cuerpo de la página
    // para evitar conflictos entre abrir, cerrar y navegar.
    document.body.addEventListener('click', function(e) {
        
        // 1. LÓGICA DEL SUBMENÚ "NEGOCIO" (Prioridad Alta)
        const dropdownToggle = e.target.closest('#mobile-dropdown-toggle');
        if (dropdownToggle) {
            e.preventDefault();
            e.stopPropagation(); // ¡Importante! Evita que se active el cierre del menú
            
            const submenu = document.getElementById('mobile-submenu');
            const arrow = dropdownToggle.innerHTML.includes('&#9662;') ? null : null; // Opcional si usas flecha en HTML

            if (submenu) {
                if (submenu.style.display === 'block') {
                    submenu.style.display = 'none';
                } else {
                    submenu.style.display = 'block';
                }
            }
            return; // Terminamos aquí, no dejamos que siga ejecutando código de cerrar
        }

        // 2. BOTÓN HAMBURGUESA (Abrir)
        // Nota: 'template-loader.js' suele manejar la apertura, pero esto es un respaldo
        if (e.target.closest('#mobile-nav-toggle')) {
            // Dejamos que template-loader o el CSS actúen, o forzamos si es necesario
            // Si template-loader no abre el menú, descomenta estas líneas:
            /*
            e.preventDefault();
            const panel = document.getElementById('mobile-menu-panel');
            const overlay = document.getElementById('body-overlay');
            const toggle = document.getElementById('mobile-nav-toggle');
            if (panel) {
                if (panel.classList.contains('is-open')) {
                    closeMenuInternal(panel, overlay, toggle);
                } else {
                    panel.classList.add('is-open');
                    panel.style.right = '0';
                    if (overlay) overlay.classList.add('is-active');
                    if (toggle) toggle.classList.add('is-active');
                }
            }
            */
            return; 
        }

        // 3. BOTÓN CERRAR (X)
        if (e.target.closest('#close-mobile-menu')) {
            e.preventDefault();
            closeMenu();
            return;
        }

        // 4. CLIC EN EL FONDO OSCURO (Overlay)
        if (e.target.id === 'body-overlay') {
            e.preventDefault();
            closeMenu();
            return;
        }

        // 5. CLIC EN CUALQUIER ENLACE DEL MENÚ (Navegación)
        // Si llegamos aquí, sabemos que NO es el botón de Negocio (porque el paso 1 lo habría interceptado)
        if (e.target.closest('#mobile-menu-panel a') || e.target.closest('.cta-button.join-button')) {
            closeMenu();
        }
    });

    // Función auxiliar para cerrar (DRY - Don't Repeat Yourself)
    function closeMenu() {
        const panel = document.getElementById('mobile-menu-panel');
        const overlay = document.getElementById('body-overlay');
        const toggle = document.getElementById('mobile-nav-toggle');
        
        closeMenuInternal(panel, overlay, toggle);
    }

    function closeMenuInternal(panel, overlay, toggle) {
        if (panel) {
            panel.classList.remove('is-open');
            panel.style.right = '-100%'; // Forzar estilo para asegurar cierre
        }
        if (overlay) overlay.classList.remove('is-active');
        if (toggle) toggle.classList.remove('is-active');
        document.body.style.overflow = ''; // Restaurar scroll
    }


    // ==========================================
    // === LÓGICA SPLASH SCREEN (INTRO)       ===
    // ==========================================
    const splashScreen = document.getElementById('splash-screen');
    const introVideo = document.getElementById('intro-video');

    if (splashScreen && introVideo) {
        introVideo.addEventListener('ended', () => {
            splashScreen.classList.add('hidden');
        });
        introVideo.addEventListener('error', () => {
            splashScreen.classList.add('hidden');
        });
    }

    // ==========================================
    // ===   BOTÓN DE AUDIO (VIDEO HERO)      ===
    // ==========================================
    const mainHeroVideo = document.getElementById('main-hero-video');
    const toggleAudioButton = document.getElementById('toggle-audio-button');

    if (mainHeroVideo && toggleAudioButton) {
        toggleAudioButton.style.display = (mainHeroVideo.muted && mainHeroVideo.volume > 0) ? 'flex' : 'none';

        toggleAudioButton.addEventListener('click', () => {
            if (mainHeroVideo.muted) {
                mainHeroVideo.muted = false;
                mainHeroVideo.currentTime = 0;
                mainHeroVideo.play();
                toggleAudioButton.style.display = 'none';
            }
        });

        mainHeroVideo.addEventListener('volumechange', () => {
            if (!mainHeroVideo.muted) toggleAudioButton.style.display = 'none';
        });
    }

    // ==========================================
    // ===      ANIMACIONES GSAP SCROLL       ===
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            gsap.from(heroContent.children, {
                duration: 1, y: 50, opacity: 0, stagger: 0.3, ease: "power2.out", delay: 0.5
            });
        }

        const sections = document.querySelectorAll('.section-to-animate');
        sections.forEach(section => {
            gsap.fromTo(section, 
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section, start: 'top 80%', toggleActions: 'play none none none'
                    }
                }
            );
        });
    }
});