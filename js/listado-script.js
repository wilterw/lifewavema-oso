// js/listado-script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- IMPORTANTE ---
    // REEMPLAZA ESTA URL CON LA URL DE TU PROPIO SCRIPT DE GOOGLE SHEETS
    const spreadsheetApiUrl = 'https://script.google.com/macros/s/AKfycbx9q6puklF0RT6Qyc3kIb1KgPcNJAPRNTdyg-ZTzj9mfq5MQg87jquQR_nZf0r8Babu/exec';
    
    const tableBody = document.getElementById('landings-table-body');

    fetch(spreadsheetApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con la API de Google Sheets.');
            }
            return response.json();
        })
        .then(data => {
            tableBody.innerHTML = ''; // Limpiar el mensaje de "Cargando..."

            if (data && data.length > 0) {
                data.forEach(lead => {
                    const newRow = document.createElement('tr');
                    
                    // --- LÓGICA DE COLOR MODIFICADA ---
                    let statusClass = '';
                    let statusText = lead.Estatus || ''; // Tomamos el texto del estatus

                    if (statusText.toLowerCase() === 'en linea') {
                        statusClass = 'status-en-linea'; // Verde
                    } else if (statusText.toLowerCase() === 'en construccion') {
                        statusClass = 'status-en-construccion'; // Rojo
                    }
                    
                    // Crear el enlace de la página
                    const pageLink = `http://${lead.Pagina}.lifewaveelite.com`;

                    newRow.innerHTML = `
                        <td>${lead.Nombre}</td>
                        <td><a href="${pageLink}" target="_blank">${pageLink}</a></td>
                        <td class="${statusClass}">${statusText}</td>
                    `;
                    tableBody.appendChild(newRow);
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="3" class="text-center py-4">No hay landings para mostrar.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            tableBody.innerHTML = '<tr><td colspan="3" class="text-center py-4">Error al cargar los datos. Por favor, revisa que la URL de la API sea correcta.</td></tr>';
        });
});