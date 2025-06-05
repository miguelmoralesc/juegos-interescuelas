const form = document.getElementById('result-form');
const tableBody = document.querySelector('#results-table tbody');
const deporteSelect = document.getElementById('deporte');
const resALabel = document.querySelector('#resultadoA-container label');
const resAInput = document.getElementById('resA');
const resBLabel = document.querySelector('#resultadoB-container label');
const resBInput = document.getElementById('resB');

const endpoint = 'YOUR_APPS_SCRIPT_URL'; // Reemplazar con URL real

function updateResultLabels() {
    const deporte = deporteSelect.value;
    switch (deporte) {
        case 'futbol':
            resALabel.textContent = 'Goles A:';
            resBLabel.textContent = 'Goles B:';
            resAInput.type = 'number';
            resBInput.type = 'number';
            break;
        case 'ajedrez':
            resALabel.textContent = 'Resultado:';
            resBLabel.textContent = '—';
            resAInput.type = 'text';
            resBInput.type = 'hidden';
            break;
        case 'atletismo':
            resALabel.textContent = 'Marca A:';
            resBLabel.textContent = 'Marca B:';
            resAInput.type = 'text';
            resBInput.type = 'text';
            break;
        default:
            resALabel.textContent = 'Resultado A:';
            resBLabel.textContent = 'Resultado B:';
            resAInput.type = 'text';
            resBInput.type = 'text';
    }
}

deporteSelect.addEventListener('change', updateResultLabels);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        fecha: form.fecha.value,
        escuela: form.escuela.value,
        fuerza: form.fuerza.value,
        deporte: form.deporte.value,
        tipo: form.tipo.value,
        participanteA: form.partA.value,
        participanteB: form.partB.value,
        resultadoA: form.resA.value,
        resultadoB: form.resB.value,
        observaciones: form.observaciones.value,
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('Enviado', response);
        addRow(data);
        form.reset();
        updateResultLabels();
    } catch (err) {
        console.error('Error al enviar', err);
    }
});

function addRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.fecha}</td>
        <td>${data.escuela}</td>
        <td>${data.fuerza}</td>
        <td>${data.deporte}</td>
        <td>${data.tipo}</td>
        <td>${data.participanteA}</td>
        <td>${data.participanteB}</td>
        <td>${data.resultadoA}</td>
        <td>${data.resultadoB}</td>
        <td>${data.observaciones}</td>
    `;
    tableBody.appendChild(row);
}

// Inicializar etiquetas correctamente
updateResultLabels();
