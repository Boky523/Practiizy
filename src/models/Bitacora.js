class Bitacora {
    constructor(id, estudianteId, estudianteNombre, fecha, horas, descripcion) {
        this.id = id;
        this.estudianteId = estudianteId;
        this.estudianteNombre = estudianteNombre;
        this.fecha = fecha;
        this.horas = horas;
        this.descripcion = descripcion;
        this.estado = 'Pendiente'; // Pendiente, Aprobado, Rechazado
    }

    aprobar() {
        this.estado = 'Aprobado';
    }

    rechazar() {
        this.estado = 'Rechazado';
    }
}

module.exports = Bitacora;
