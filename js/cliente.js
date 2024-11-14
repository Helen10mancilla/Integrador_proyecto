document.addEventListener('DOMContentLoaded', function () {
    const productosCliente = document.getElementById('productosCliente');
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const carritoCantidad = document.getElementById('carritoCantidad');
    
    let carrito = [];
    let total = 0;

    // Datos de ejemplo de productos
    const productos = {
        Verduras: [
            { nombre: 'Tomate', precio: 2.000 },
            { nombre: 'Espinaca', precio: 1.500},
        ],
        Frutas: [
            { nombre: 'Manzana', precio: 500 },
          
        ],
        Tubérculos: [
            { nombre: 'Papa', precio: 3.000 },
           
        ],
      
    };

    // Función para mostrar productos según la categoría seleccionada
    window.mostrarProductosPorCategoria = function (categoria) {
        productosCliente.innerHTML = ''; // Limpiar productos previos
        const productosSeleccionados = productos[categoria];

        productosSeleccionados.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <h4>${producto.nombre}</h4>
                <p>Precio: S/ ${producto.precio.toFixed(2)}</p>
                <button class="agregarCarrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
            `;
            productosCliente.appendChild(productoDiv);
        });

        // Agregar evento a los botones "Agregar al Carrito"
        document.querySelectorAll('.agregarCarrito').forEach(boton => {
            boton.addEventListener('click', function () {
                const nombre = this.dataset.nombre;
                const precio = parseFloat(this.dataset.precio);
                agregarAlCarrito(nombre, precio);
            });
        });

        // Cambiar a la sección de productos
        cambiarSeccion('productos');
    };

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio });
        total += precio;
        actualizarCarrito();
    }

    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        listaCarrito.innerHTML = ''; // Limpiar la lista de carrito
        carrito.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.textContent = `${item.nombre} - S/ ${item.precio.toFixed(2)}`;
            listaCarrito.appendChild(itemLi);
        });
        totalCarrito.textContent = total.toFixed(2);
        carritoCantidad.textContent = carrito.length; // Actualizar cantidad de productos en el carrito
    }

    // Función para realizar la compra (puedes personalizarla más adelante)
    window.realizarCompra = function () {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }
        alert('Compra realizada con éxito. Total: S/ ' + total.toFixed(2));
        carrito = []; // Limpiar el carrito
        total = 0;
        actualizarCarrito(); // Actualizar la vista del carrito
    };

    // Función para cambiar entre secciones
    function cambiarSeccion(seccionActiva) {
        const secciones = ['inicio', 'categorias', 'productos', 'carrito'];
        secciones.forEach(seccion => {
            const elemento = document.getElementById(seccion);
            elemento.classList.remove('contenido-activo');
            elemento.classList.add('contenido');
        });
        document.getElementById(seccionActiva).classList.remove('contenido');
        document.getElementById(seccionActiva).classList.add('contenido-activo');
    }

    // Manejar clic en el botón "Inicio"
    document.getElementById('inicioBtn').addEventListener('click', function () {
        cambiarSeccion('inicio');
    });

    // Manejar clic en el botón "Categorías"
    document.getElementById('categoriasBtn').addEventListener('click', function () {
        cambiarSeccion('categorias');
    });

    // Manejar clic en el botón "Carrito"
    document.getElementById('carritoBtn').addEventListener('click', function () {
        cambiarSeccion('carrito');
    });
});
