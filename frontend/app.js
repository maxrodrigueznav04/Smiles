const API_URL = 'https://smiles-d742.onrender.com/api';

// --- LÓGICA PACIENTES ---
if (document.getElementById('formPaciente')) {
    document.getElementById('formPaciente').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            nombre: document.getElementById('p_nombre').value,
            edad: document.getElementById('p_edad').value,
            telefono: document.getElementById('p_telefono').value,
            correo: document.getElementById('p_correo').value,
            direccion: document.getElementById('p_direccion').value
        };
        await fetch(`${API_URL}/pacientes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        document.getElementById('formPaciente').reset();
        cargarPacientes();
    });
}

async function cargarPacientes(sortBy = '', order = 'asc') {
    let url = `${API_URL}/pacientes`;
    if (sortBy) url += `?sortBy=${sortBy}&order=${order}`;
    
    try {
        const res = await fetch(url);
        const pacientes = await res.json();
        const tbody = document.getElementById('tablaPacientes'); 
        if (!tbody) return; 
        
        tbody.innerHTML = '';
        pacientes.forEach(p => {
            tbody.innerHTML += `<tr><td>${p.nombre}</td><td>${p.edad}</td><td>${p.telefono}</td><td>${p.correo}</td>
            <td><button onclick="eliminar('${API_URL}/pacientes/${p._id}')" style="background-color: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Eliminar</button></td></tr>`;
        });
    } catch (error) { console.error("Error al cargar pacientes:", error); }
}
window.cargarPacientes = cargarPacientes;
if (document.getElementById('tablaPacientes')) cargarPacientes();


// --- LÓGICA DENTISTAS ---
if (document.getElementById('formDentista')) {
    document.getElementById('formDentista').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            nombre: document.getElementById('d_nombre').value,
            especialidad: document.getElementById('d_especialidad').value,
            telefono: document.getElementById('d_telefono').value,
            correo: document.getElementById('d_correo').value,
            horarioAtencion: document.getElementById('d_horario').value
        };
        await fetch(`${API_URL}/dentistas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        document.getElementById('formDentista').reset();
        cargarDentistas();
    });
}

async function cargarDentistas(sortBy = '', order = 'asc') {
    let url = `${API_URL}/dentistas`;
    if (sortBy) url += `?sortBy=${sortBy}&order=${order}`;

    try {
        const res = await fetch(url);
        const dentistas = await res.json();
        const tbody = document.getElementById('tablaDentistas');
        if (!tbody) return;

        tbody.innerHTML = '';
        dentistas.forEach(d => {
            tbody.innerHTML += `<tr><td>${d.nombre}</td><td>${d.especialidad}</td><td>${d.horarioAtencion || d.horario}</td>
            <td><button onclick="eliminar('${API_URL}/dentistas/${d._id}')" style="background-color: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Eliminar</button></td></tr>`;
        });
    } catch (error) { console.error("Error al cargar dentistas:", error); }
}
window.cargarDentistas = cargarDentistas;
if (document.getElementById('tablaDentistas')) cargarDentistas();


// --- LÓGICA CITAS ---
if (document.getElementById('formCita')) {
    document.getElementById('formCita').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            paciente: document.getElementById('c_paciente').value,
            dentista: document.getElementById('c_dentista').value,
            fecha: document.getElementById('c_fecha').value,
            hora: document.getElementById('c_hora').value,
            motivo: document.getElementById('c_motivo').value,
            estado: document.getElementById('c_estado').value
        };
        await fetch(`${API_URL}/citas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        document.getElementById('formCita').reset();
        cargarCitas();
    });
}

async function cargarCitas(sortBy = '', order = 'asc') {
    let url = `${API_URL}/citas`;
    if (sortBy) url += `?sortBy=${sortBy}&order=${order}`;

    try {
        const res = await fetch(url);
        const citas = await res.json();
        const tbody = document.getElementById('tablaCitas');
        if (!tbody) return;

        tbody.innerHTML = '';
        citas.forEach(c => {
            tbody.innerHTML += `<tr><td>${c.paciente}</td><td>${c.dentista}</td><td>${c.fecha} - ${c.hora}</td><td>${c.estado}</td>
            <td><button onclick="eliminar('${API_URL}/citas/${c._id}')" style="background-color: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Cancelar</button></td></tr>`;
        });
    } catch (error) { console.error("Error al cargar citas:", error); }
}
window.cargarCitas = cargarCitas;
if (document.getElementById('tablaCitas')) cargarCitas();


// --- FUNCIÓN GLOBAL PARA ELIMINAR ---
async function eliminar(url) {
    if(confirm('¿Seguro que deseas eliminar este registro?')) {
        try {
            await fetch(url, { method: 'DELETE' });
            location.reload();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Hubo un error al eliminar el registro.");
        }
    }
}
window.eliminar = eliminar;