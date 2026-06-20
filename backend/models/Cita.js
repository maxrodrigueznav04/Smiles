const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    paciente: { type: String, required: true },
    dentista: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    motivo: { type: String, required: true },
    estado: { type: String, default: 'Programada' } // Programada, Confirmada, Atendida, Cancelada
});

module.exports = mongoose.model('Cita', citaSchema);