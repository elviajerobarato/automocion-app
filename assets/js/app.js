
let herramientas = [];

async function cargarDatos(){

    const response = await fetch('data/herramientas.json');

    herramientas = await response.json();

    renderizarTabla(herramientas);

    document.getElementById('searchInput').addEventListener('input', filtrarDatos);

    document.getElementById('workshopFilter').addEventListener('change', filtrarDatos);

}

function renderizarTabla(datos){

    const tbody = document.getElementById('toolsTableBody');

    tbody.innerHTML = '';

    datos.forEach(item => {

        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td><span class="badge bg-primary">${item.taller}</span></td>
            <td>${item.cantidad}</td>
            <td>${item.producto}</td>
            <td>${item.estado}</td>
            <td>${item.ubicacion}</td>
            <td>${item.fechaAlta}</td>
            <td>${item.observacion}</td>
        `;

        tbody.appendChild(fila);

    });

}

function filtrarDatos(){

    const texto = document.getElementById('searchInput').value.toLowerCase();

    const taller = document.getElementById('workshopFilter').value;

    const filtrados = herramientas.filter(item => {

        const coincideTexto =
            item.producto.toLowerCase().includes(texto) ||
            item.ubicacion.toLowerCase().includes(texto) ||
            item.estado.toLowerCase().includes(texto);

        const coincideTaller =
            taller === 'Todos' || item.taller === taller;

        return coincideTexto && coincideTaller;

    });

    renderizarTabla(filtrados);

}

cargarDatos();
