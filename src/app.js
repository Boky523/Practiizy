const express = require('express');
const path = require('path');
const { Estudiante, Supervisor, Tutor } = require('./models/Usuario');
const Bitacora = require('./models/Bitacora');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Base de datos simulada en memoria con objetos instanciados
const usuarios = [
    new Estudiante(1, 'Oscar Mauricio Jaimes', 'oscar.jaimes@ibero.edu.co', '123456', 'Ingeniería de Software', 160),
    new Estudiante(2, 'Samuel Gabriel Bejarano', 'samuel.bejarano@ibero.edu.co', '123456', 'Ingeniería de Software', 160),
    new Supervisor(3, 'Carlos Rodríguez (Tech Solutions)', 'supervisor@empresa.com', '123456', 'Tech Solutions S.A.S'),
    new Tutor(4, 'Dra. Ana Mosquera', 'ana.mosquera@ibero.edu.co', '123456', 'Facultad de Ingeniería')
];

const bitacoras = [
    new Bitacora(101, 1, 'Oscar Mauricio Jaimes', '2026-11-01', 5, 'Desarrollo de prototipo funcional y backend Express'),
    new Bitacora(102, 1, 'Oscar Mauricio Jaimes', '2026-11-02', 4, 'Modelado POO de clases de usuarios y bitácoras'),
    new Bitacora(103, 2, 'Samuel Gabriel Bejarano', '2026-11-03', 6, 'Diseño de interfaz responsiva y control de autenticación')
];

// Endpoint de Autenticación / Login
app.post('/api/login', (req, res) => {
    const { correo, password } = req.body;
    const usuario = usuarios.find(u => u.correo === correo && u.validarPassword(password));

    if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas. Verifique correo o contraseña.' });
    }

    res.json({
        mensaje: 'Inicio de sesión exitoso',
        usuario: usuario.obtenerPerfil()
    });
});

// Endpoint para obtener bitácoras según rol
app.get('/api/bitacoras', (req, res) => {
    const { estudianteId } = req.query;
    if (estudianteId) {
        const filtradas = bitacoras.filter(b => b.estudianteId === Number(estudianteId));
        return res.json(filtradas);
    }
    res.json(bitacoras);
});

// Endpoint para crear bitácora (Solo Estudiantes)
app.post('/api/bitacoras', (req, res) => {
    const { estudianteId, estudianteNombre, fecha, horas, descripcion, rol } = req.body;

    if (rol !== 'Estudiante') {
        return res.status(403).json({ mensaje: 'Acceso denegado. Solo los estudiantes pueden registrar bitácoras.' });
    }

    const nuevaBitacora = new Bitacora(Date.now(), estudianteId, estudianteNombre, fecha, Number(horas), descripcion);
    bitacoras.push(nuevaBitacora);
    res.status(201).json({ mensaje: 'Bitácora registrada exitosamente', bitacora: nuevaBitacora });
});

// Endpoint para aprobar/rechazar bitácora (Solo Supervisores o Tutores)
app.put('/api/bitacoras/:id/estado', (req, res) => {
    const { id } = req.params;
    const { accion, rol } = req.body; // accion: 'aprobar' o 'rechazar'

    if (rol !== 'Supervisor' && rol !== 'Tutor') {
        return res.status(403).json({ mensaje: 'Acceso denegado. Solo Supervisores o Tutores pueden aprobar bitácoras.' });
    }

    const bitacora = bitacoras.find(b => b.id === Number(id));
    if (!bitacora) {
        return res.status(404).json({ mensaje: 'Bitácora no encontrada' });
    }

    if (accion === 'aprobar') {
        bitacora.aprobar();
    } else {
        bitacora.rechazar();
    }

    res.json({ mensaje: `Bitácora ${bitacora.estado.toLowerCase()} exitosamente`, bitacora });
});

app.listen(PORT, () => {
    console.log(`Servidor PractiIZY corriendo con Login y Roles en http://localhost:${PORT}`);
});
