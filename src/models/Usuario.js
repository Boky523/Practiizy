// Modelado POO de Usuarios y Roles en JavaScript
class Usuario {
    constructor(id, nombre, correo, rol, password) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.rol = rol; // Estudiante, Supervisor, Tutor, Admin
        this.password = password;
    }

    validarPassword(pass) {
        return this.password === pass;
    }

    obtenerPerfil() {
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo,
            rol: this.rol
        };
    }
}

class Estudiante extends Usuario {
    constructor(id, nombre, correo, password, carrera, horasRequeridas) {
        super(id, nombre, correo, 'Estudiante', password);
        this.carrera = carrera;
        this.horasRequeridas = horasRequeridas;
    }
}

class Supervisor extends Usuario {
    constructor(id, nombre, correo, password, empresa) {
        super(id, nombre, correo, 'Supervisor', password);
        this.empresa = empresa;
    }
}

class Tutor extends Usuario {
    constructor(id, nombre, correo, password, facultad) {
        super(id, nombre, correo, 'Tutor', password);
        this.facultad = facultad;
    }
}

module.exports = { Usuario, Estudiante, Supervisor, Tutor };
