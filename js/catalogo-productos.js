document.addEventListener('DOMContentLoaded', () => {
    const catalogoGrid = document.getElementById('catalogo-grid');
    const filtrosSelect = document.getElementById('filtro-categorias');
    const searchBar = document.getElementById('search-bar');
    const paginacionContainer = document.getElementById('paginacion-container');

    // Salir si no estamos en la página del catálogo
    if (!catalogoGrid) return;

    const productosPorPagina = 6;
    let categoriaActual = 'todos';
    let paginaActual = 1;
    let terminoBusqueda = '';

    function capitalizar(str) {
        if (typeof str !== 'string' || str.length === 0) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function mostrarProductos() {
        catalogoGrid.innerHTML = '';
        paginacionContainer.innerHTML = '';

        let productosFiltrados = categoriaActual === 'todos' 
            ? productos 
            : productos.filter(p => p.categorias.includes(categoriaActual));
        
        if (terminoBusqueda.length > 0) {
            productosFiltrados = productosFiltrados.filter(p => 
                p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
            );
        }

        const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
        const inicio = (paginaActual - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
        const productosEnPagina = productosFiltrados.slice(inicio, fin);

        productosEnPagina.forEach(producto => {
            const mensajeWhatsapp = encodeURIComponent(producto.whatsappMsg.replace('{affiliateName}', affiliateData.name));
            const linkWhatsapp = `https://wa.me/${affiliateData.whatsapp}?text=${mensajeWhatsapp}`;
            const linkCompra = productLinks[producto.id] || '#';

            const productoCard = `
                <div class="product-card-promo">
                    <a href="${producto.pagina}" class="product-card-link">
                        <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
                        <div class="product-card-info">
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion}</p>
                        </div>
                    </a>
                    <div class="product-card-buttons">
                        <a href="${producto.pagina}" class="btn-secondary">Ver Detalles</a>
                        <a href="${linkCompra}" target="_blank" class="cta-button">Comprar</a>
                    </div>
                </div>
            `;
            catalogoGrid.innerHTML += productoCard;
        });
        
        if (totalPaginas > 1) {
            for (let i = 1; i <= totalPaginas; i++) {
                const botonPagina = document.createElement('button');
                botonPagina.innerText = i;
                botonPagina.classList.add('pag-btn');
                if (i === paginaActual) botonPagina.classList.add('active');
                botonPagina.addEventListener('click', () => {
                    paginaActual = i;
                    mostrarProductos();
                    window.scrollTo(0, 0);
                });
                paginacionContainer.appendChild(botonPagina);
            }
        }
    }

    function crearFiltros() {
        const todasLasCategorias = productos.flatMap(p => p.categorias);
        const categoriasUnicas = [...new Set(todasLasCategorias)].sort();
        
        const categoriasFinales = ['todos', ...categoriasUnicas];

        categoriasFinales.forEach(cat => {
            const opcion = document.createElement('option');
            opcion.value = cat;
            const textoCategoria = cat === 'todos' ? 'Todas las Categorías' : capitalizar(cat.replace(/-/g, ' '));
            opcion.innerText = textoCategoria;
            filtrosSelect.appendChild(opcion);
        });

        filtrosSelect.addEventListener('change', (e) => {
            categoriaActual = e.target.value;
            paginaActual = 1;
            mostrarProductos();
        });

        searchBar.addEventListener('keyup', (e) => {
            terminoBusqueda = e.target.value;
            paginaActual = 1;
            mostrarProductos();
        });
    }

    crearFiltros();
    mostrarProductos();
});