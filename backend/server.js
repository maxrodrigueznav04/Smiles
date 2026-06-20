const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Paciente = require('./models/Paciente');
const Dentista = require('./models/Dentista');
const Cita = require('./models/Cita');

mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

// --- PACIENTES ---
app.get('/api/pacientes', async (req, res) => {
    const { sortBy, order } = req.query;
    const sort = sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : {};
    res.json(await Paciente.find().sort(sort));
});
app.post('/api/pacientes', async (req, res) => res.json(await new Paciente(req.body).save()));
app.delete('/api/pacientes/:id', async (req, res) => {
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Paciente eliminado' });
});

// --- DENTISTAS ---
app.get('/api/dentistas', async (req, res) => {
    const { sortBy, order } = req.query;
    const sort = sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : {};
    res.json(await Dentista.find().sort(sort));
});
app.post('/api/dentistas', async (req, res) => res.json(await new Dentista(req.body).save()));
app.delete('/api/dentistas/:id', async (req, res) => {
    await Dentista.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dentista eliminado' });
});

// --- CITAS ---
app.get('/api/citas', async (req, res) => {
    const { sortBy, order } = req.query;
    const sort = sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : {};
    res.json(await Cita.find().sort(sort));
});
app.post('/api/citas', async (req, res) => res.json(await new Cita(req.body).save()));
app.delete('/api/citas/:id', async (req, res) => {
    await Cita.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cita cancelada' });
});

// --- PANEL ADMINISTRATIVO ---
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalPacientes = await Paciente.countDocuments();
        const totalDentistas = await Dentista.countDocuments();
        const totalCitas = await Cita.countDocuments();
        const totalCanceladas = await Cita.countDocuments({ estado: 'Cancelada' });
        res.json({ totalPacientes, totalDentistas, totalCitas, totalCanceladas });
    } catch (e) { res.status(500).json({ error: 'Error' }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));