// js/landing-script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('landing-form');
    const modal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal');
    const submitButton = document.getElementById('submit-btn');

    // Webhook URL
    const webhookUrl = 'https://n8n.socialmarketinglatino.com/webhook/landing-lifewave';

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        const nombre = document.getElementById('nombre').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const referidoUrl = document.getElementById('referido').value;
        const whatsappGroup = document.getElementById('whatsapp_group').value;
        const correo = document.getElementById('correo').value;
        
        let subdominio = '';
        try {
            const urlParts = referidoUrl.split('/');
            if (urlParts.length > 3 && urlParts[2].includes('lifewave.com')) {
                subdominio = urlParts[3];
            }
        } catch (e) {
            console.error("No se pudo extraer el subdominio del enlace:", e);
        }

        // --- NUEVA SECCIÓN: GENERAR EL CONTENIDO DEL ARCHIVO CONFIG.JS ---
        const generateConfigFileContent = (data) => {
            // Usamos plantillas de texto (template literals) para construir el archivo
            return `
// js/config.js

// ----------------------------------------------------
// DATOS DEL AFILIADO - GENERADO AUTOMÁTICAMENTE
// ----------------------------------------------------
const affiliateData = {
    // Nombre del afiliado
    name: "${data.nombre}",

    // Número de WhatsApp
    whatsapp: "${data.whatsapp}",

    // Enlace principal de inscripción
    affiliateLink: "${data.referido}",
    
    // Enlace al grupo de WhatsApp
    whatsappGroup: "${data.whatsappGroup}"
};

// ----------------------------------------------------
// ENLACES DE COMPRA PARA CADA PRODUCTO
// ----------------------------------------------------
const productLinks = {
    x39: "https://www.lifewave.com/${data.subdominio}/store/product/X39",
    x49: "https://www.lifewave.com/${data.subdominio}/store/product/X49",
    icewave: "https://www.lifewave.com/${data.subdominio}/store/product/IceWave",
    yAgeAeon: "https://www.lifewave.com/${data.subdominio}/store/product/Y-Age-Aeon",
    yAgeGlutathione: "https://www.lifewave.com/${data.subdominio}/store/product/Y-Age-Glutathione",
    yAgeCarnosine: "https://www.lifewave.com/${data.subdominio}/store/product/Y-Age-Carnosine",
    energyEnhancer: "https://www.lifewave.com/${data.subdominio}/store/product/Energy-Enhancer",
    silentNights: "https://www.lifewave.com/${data.subdominio}/store/product/Silent-Nights",
    sp6Complete: "https://www.lifewave.com/${data.subdominio}/store/product/SP6-Complete"
};
`;
        };

        // Generamos el contenido del archivo
        const configFileContent = generateConfigFileContent({
            nombre,
            whatsapp,
            referido: referidoUrl,
            whatsappGroup,
            subdominio
        });
        
        // Preparamos TODOS los datos para enviar al webhook
        const formDataForWebhook = {
            nombre,
            whatsapp,
            referido: referidoUrl,
            whatsapp_group: whatsappGroup,
            correo,
            subdominio,
            configFileContent: configFileContent // <- AQUÍ AÑADIMOS EL CONTENIDO DEL ARCHIVO
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataForWebhook),
            });

            if (response.ok) {
                modal.style.display = 'flex';
                form.reset(); 
            } else {
                const errorData = await response.json();
                alert(`Error al enviar la solicitud: ${errorData.message || 'Inténtalo de nuevo.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema con el envío. Por favor, revisa tu conexión y vuelve a intentarlo.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Construir Mi Página';
        }
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});