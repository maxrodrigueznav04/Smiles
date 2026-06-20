const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    direccion: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paciente', pacienteSchema);