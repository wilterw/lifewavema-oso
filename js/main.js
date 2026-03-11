// js/main.js

function populateAffiliateData() {
    if (typeof affiliateData === 'undefined' || typeof productLinks === 'undefined') {
        console.error("Config.js no cargado o datos de afiliado ausentes.");
        return;
    }

    const { name, whatsapp, affiliateLink, whatsappGroup } = affiliateData;
    const whatsappMessage = encodeURIComponent(`Hola ${name}, quiero más información sobre los parches LifeWave.`);
    const whatsappURL = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;

    // Mapeo de IDs a sus valores
    const elementsToUpdate = {
        'affiliate-name-header': { text: name },
        'join-button-nav': { href: affiliateLink },
        'contact-card-link': { href: whatsappURL },
        'affiliate-name-footer': { text: name },
        'whatsapp-link-footer': { href: whatsappURL },
        'join-button-main': { href: affiliateLink },
        'contact-modal-direct': { href: whatsappURL },
        'contact-modal-group': { href: whatsappGroup },
        'cta-whatsapp': { href: whatsappURL },
        'cta-group': { href: whatsappGroup },
        'cta-register': { href: affiliateLink },
        'mobile-join-button': { href: affiliateLink }
    };

    for (const id in elementsToUpdate) {
        const el = document.getElementById(id);
        if (el) {
            if (elementsToUpdate[id].text) el.textContent = elementsToUpdate[id].text;
            if (elementsToUpdate[id].href) el.href = elementsToUpdate[id].href;
        }
    }
}

function createFloatingWhatsAppButton() {
    if (typeof affiliateData === 'undefined' || document.querySelector('.floating-whatsapp-button')) return;

    const { name, whatsapp } = affiliateData;
    const message = encodeURIComponent(`Hola ${name}, quiero más información sobre LifeWave.`);
    const whatsappURL = `https://wa.me/${whatsapp}?text=${message}`;

    const button = document.createElement('a');
    button.href = whatsappURL;
    button.target = '_blank';
    button.className = 'floating-whatsapp-button';
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.5-97.2-24.6l-7-4.1-72.5 19.1 19.4-70.5-4.5-7.3C52.5 314.3 42.1 270.5 42.1 225.9c0-99.4 80.7-180.1 180.1-180.1 49.6 0 95.3 19.5 128.8 53.1 33.5 33.5 53.1 79.2 53.1 128.8 0 99.4-80.7 180.1-182.1 180.1zM248.8 359c-4.9 0-9.8-1.1-14.3-3.2s-8.7-4.7-12.7-7.9c-4-3.2-8.2-7.3-12.5-12.1-4.2-4.8-8.4-9.8-12.3-15s-7.4-10.4-10.6-15.8c-3.2-5.4-5.7-10.9-7.4-16.5-1.7-5.6-2.5-11.2-2.5-16.8s.8-11.2 2.5-16.8c1.7-5.6 4.2-11.1 7.4-16.5s6.6-10.2 10.6-15c3.9-4.8 8.1-9.5 12.3-14.2s8.7-8.9 12.5-12.5c4-3.6 8.3-6.8 12.7-9.5s9.4-4.6 14.3-5.9c4.9-1.3 9.9-1.9 14.9-1.9 10.1 0 19.4 2.1 27.8 6.3 8.4 4.2 15.3 9.9 20.6 17.1s8.9 15.3 10.9 24.1c2 8.8 3.1 17.7 3.1 26.6 0 11.2-1.7 22.3-5.2 33.1-3.5 10.8-8.9 20.6-16.1 29.4-7.2 8.8-16.1 16.1-26.6 21.9-10.5 5.8-22.3 8.7-35.4 8.7z"/></svg>';
    document.body.appendChild(button);
}