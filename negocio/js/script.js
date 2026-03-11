// /negocio/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO CORREGIDO PARA EL REPRODUCTOR DE VIDEO PRINCIPAL ---
    const mainVideoPlayer = document.getElementById('main-video-player');
    const audioOverlayButton = document.getElementById('audio-overlay-button');

    if (mainVideoPlayer && audioOverlayButton) {
        // El video ya está en autoplay y muted por los atributos HTML.
        // Esta función se activará solo cuando el usuario haga clic en el botón.
        
        audioOverlayButton.addEventListener('click', () => {
            mainVideoPlayer.muted = false;      // 1. Activa el sonido
            mainVideoPlayer.currentTime = 0;    // 2. Reinicia el video al principio
            mainVideoPlayer.play();             // 3. Asegura la reproducción
            audioOverlayButton.style.display = 'none'; // 4. Oculta el botón para no interrumpir
        });
    }

    // --- MANEJO DE FORMULARIOS Y WEBHOOK (SIN CAMBIOS) ---
    const mainForm = document.getElementById('negocio-form');
    const exitForm = document.getElementById('exit-form');
    const webhookUrl = 'https://n8n.socialmarketinglatino.com/webhook/lifewave-negocio';

    const handleFormSubmit = async (event, form, button) => {
        event.preventDefault();
        button.disabled = true;
        button.textContent = 'Enviando...';
        
        const isExitForm = form.id === 'exit-form';
        
        const prospectData = {
            nombre: document.getElementById(isExitForm ? 'exit-nombre' : 'nombre').value,
            email: document.getElementById(isExitForm ? 'exit-email' : 'email').value,
            whatsapp: document.getElementById(isExitForm ? 'exit-whatsapp' : 'whatsapp').value,
        };

        let sponsorData = {};
        if (typeof affiliateData !== 'undefined') {
            sponsorData = {
                sponsor_name: affiliateData.name,
                sponsor_whatsapp: affiliateData.whatsapp,
                sponsor_email: affiliateData.email,
                sponsor_affiliateLink: affiliateData.affiliateLink,
                sponsor_whatsappGroup: affiliateData.whatsappGroup
            };
        }

        const payload = {
            prospecto: prospectData,
            sponsor: sponsorData
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                if (isExitForm) {
                    document.getElementById('exit-intent-modal').classList.remove('is-visible');
                }
                showSuccessModal(prospectData.nombre);
                form.reset();
            } else {
                alert('Hubo un error al enviar tu registro. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema de conexión. Por favor, revisa tu internet y vuelve a intentarlo.');
        } finally {
            button.disabled = false;
            button.textContent = isExitForm ? 'Enviar Información' : 'Registrarme Ahora';
        }
    };

    mainForm.addEventListener('submit', (e) => {
        handleFormSubmit(e, mainForm, document.getElementById('submit-btn'));
    });

    exitForm.addEventListener('submit', (e) => {
        handleFormSubmit(e, exitForm, document.getElementById('exit-submit-btn'));
    });

    // --- MANEJO DE VENTANAS MODALES (SIN CAMBIOS) ---
    const successModal = document.getElementById('success-modal');
    const exitModal = document.getElementById('exit-intent-modal');
    const closeExitModalBtn = document.getElementById('close-exit-modal');
    const contactSponsorBtn = document.getElementById('contact-sponsor-btn');
    const joinGroupBtn = document.getElementById('join-group-btn');
    
    const modalTitle = document.getElementById('modal-title');
    const modalMessage1 = document.getElementById('modal-message-line1');
    
    function showSuccessModal(prospectName) {
        if (typeof affiliateData === 'undefined') {
            console.error("Los datos del afiliado (config.js) no están disponibles.");
            contactSponsorBtn.style.display = 'none';
            joinGroupBtn.style.display = 'none';
        } else {
            modalTitle.textContent = `¡Gracias por Registrarte, ${prospectName}!`;
            modalMessage1.textContent = `${affiliateData.name} se estará poniendo en contacto contigo por correo.`;

            const whatsappMessage = encodeURIComponent(`Hola ${affiliateData.name}, me acabo de registrar en la página de oportunidad de negocio y quiero más información.`);
            contactSponsorBtn.href = `https://wa.me/${affiliateData.whatsapp}?text=${whatsappMessage}`;

            if (affiliateData.whatsappGroup) {
                joinGroupBtn.href = affiliateData.whatsappGroup;
                joinGroupBtn.style.display = 'block';
            } else {
                joinGroupBtn.style.display = 'none';
            }
        }
        successModal.classList.add('is-visible');
    }
    
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('is-visible');
        }
    });

    let exitIntentShown = false;
    document.addEventListener('mouseout', (e) => {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            exitModal.classList.add('is-visible');
        }
    });

    closeExitModalBtn.addEventListener('click', () => {
        exitModal.classList.remove('is-visible');
    });

    // --- LÓGICA DE ANIMACIONES CON GSAP (SIN CAMBIOS) ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".hero-content > *", {
            duration: 1, y: 50, opacity: 0, stagger: 0.3, ease: "power2.out", delay: 0.5
        });

        const sections = document.querySelectorAll('.section-to-animate');
        sections.forEach(section => {
            gsap.to(section, {
                autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: section, start: 'top 80%', toggleActions: 'play none none none',
                }
            });
        });
    }
});