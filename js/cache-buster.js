// js/cache-buster.js

(function() {
    // Asegurarse de que siteVersion está definido
    if (typeof siteVersion === 'undefined') {
        console.error('La variable siteVersion no está definida. Asegúrate de cargar site-settings.js');
        return;
    }

    // Función para añadir la versión a una URL
    const addVersion = (url) => {
        if (url) {
            return `${url}?v=${siteVersion}`;
        }
        return url;
    };

    // Aplicar a todas las hojas de estilo <link>
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        link.href = addVersion(link.href);
    });

    // Aplicar a todos los scripts <script>
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        // Evitamos modificar el propio script y los que ya tienen parámetros
        const isCacheBusterScript = script.src.includes('cache-buster.js');
        const hasParams = script.src.includes('?');
        
        if (!isCacheBusterScript && !hasParams) {
            script.src = addVersion(script.src);
        }
    });
})();