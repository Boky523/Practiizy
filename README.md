Prototipo Funcional de Gestión de Prácticas Profesionales

Este repositorio contiene el prototipo funcional completo desarrollado para la **Actividad 4** del curso **Proyecto de Software**, dando continuidad a la propuesta planteada en la Actividad 2.

##Novedades de la Versió (Autenticación y Control de Roles)
- **Sistema de Login Simulado:** Autenticación por correo y contraseña contra instancias del modelo de clases.
- **Control de Acceso Basado en Roles (RBAC):**
  - **Estudiante:** Acceso a formulario para registrar bitácoras y consultar su histórico.
  - **Supervisor / Tutor:** Interfaz protegida para evaluar, aprobar o rechazar bitácoras registradas.
- **Modelo POO:** Herencia y encapsulamiento en JavaScript (`Usuario`, `Estudiante`, `Supervisor`, `Tutor`, `Bitacora`).

##Instrucciones de Instalación y Ejecución

1. **Reemplazar/Actualizar archivos en la carpeta de trabajo:**
   Asegúrate de copiar los nuevos archivos en tu proyecto.

2. **Ejecutar el servidor:**
   ```bash
   npm start
   ```

3. **Acceso Web:**
   Ingresa a `http://localhost:3000` en tu navegador.

##Cuentas de Prueba
- **Estudiante:** `oscar.jaimes@ibero.edu.co` | Clave: `123456`
- **Supervisor:** `supervisor@empresa.com` | Clave: `123456`
- **Tutor Académico:** `ana.mosquera@ibero.edu.co` | Clave: `123456`
