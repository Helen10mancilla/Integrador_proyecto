document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const roleSelection = document.getElementById('roleSelection');
    const roleSubmit = document.getElementById('roleSubmit');

    // Simulación de verificación del login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Verificación básica de credenciales
        if (username && password) {
            // Ocultar el formulario de inicio de sesión y mostrar la selección de rol
            loginForm.style.display = 'none';
            roleSelection.style.display = 'block';
        } else {
            alert("Credenciales incorrectas");
        }
    });

    // Cuando el usuario selecciona su rol
    roleSubmit.addEventListener('click', function() {
        const role = document.querySelector('input[name="rol"]:checked');

        if (role) {
            if (role.value === 'admin') {
                // Redirigir al panel de control del administrador
                window.location.href = 'estructura.html'; // Cambia 'estructura.html' por la URL de tu panel de control
            } else if (role.value === 'cliente') {
                // Redirigir a la vista del cliente
                window.location.href = 'vista_cliente.html'; // Cambia 'vista_cliente.html' por la URL de la vista del cliente
            }
        } else {
            alert('Por favor, selecciona un rol.');
        }
    });
});
