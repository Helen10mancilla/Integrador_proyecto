let productos = [];
let categorias = [];
let ventas = [];
let proveedores = [];
let compras = [];

// Función para alternar entre las secciones del panel
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Función para alternar la visibilidad del formulario
function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Guardar un producto
function guardarProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const categoriaProducto = document.getElementById('categoriaProducto').value;
    const precioProducto = document.getElementById('precioProducto').value;
    const imagenProducto = document.getElementById('imagenProducto').files[0]; // Imagen seleccionada

    if (nombreProducto && categoriaProducto && precioProducto && imagenProducto) {
        // Crear un objeto producto
        const reader = new FileReader();
        reader.onload = function(event) {
            // Agregar producto al array con la imagen convertida a base64
            productos.push({ 
                nombre: nombreProducto, 
                categoria: categoriaProducto, 
                precio: precioProducto, 
                imagen: event.target.result 
            });
            alert('Producto agregado con éxito');
            // Limpiar el formulario
            document.getElementById('nombreProducto').value = '';
            document.getElementById('categoriaProducto').value = '';
            document.getElementById('precioProducto').value = '';
            document.getElementById('imagenProducto').value = ''; // Limpiar imagen
            verTodos('productos');
        };
        reader.readAsDataURL(imagenProducto);
    } else {
        alert('Por favor completa todos los campos.');
    }
}

// Guardar una categoría
function guardarCategoria() {
    const nombreCategoria = document.getElementById('nombreCategoria').value;
    if (nombreCategoria) {
        categorias.push(nombreCategoria);  // Añadir la categoría al array
        actualizarSelectCategorias();  // Llamar a la función para actualizar los select
        alert('Categoría agregada con éxito');
        verTodos('categorias');  // Mostrar las categorías agregadas
        document.getElementById('nombreCategoria').value = '';  // Limpiar el campo
    } else {
        alert('Por favor ingresa un nombre de categoría.');
    }
}

// Actualizar los selects de categorías en productos y compras
function actualizarSelectCategorias() {
    const selectCategoriaProducto = document.getElementById('categoriaProducto');
    const selectCategoriaCompra = document.getElementById('categoriaCompra');
    
    // Limpiar los select antes de llenarlos nuevamente
    selectCategoriaProducto.innerHTML = '<option value="">Selecciona una categoría</option>';
    selectCategoriaCompra.innerHTML = '<option value="">Selecciona una categoría</option>';

    // Llenar los select con las categorías del array
    categorias.forEach(categoria => {
        const optionProducto = document.createElement('option');
        optionProducto.value = categoria;
        optionProducto.textContent = categoria;
        selectCategoriaProducto.appendChild(optionProducto);

        const optionCompra = document.createElement('option');
        optionCompra.value = categoria;
        optionCompra.textContent = categoria;
        selectCategoriaCompra.appendChild(optionCompra);
    });
}

// Registrar una venta
function registrarVenta() {
    const nombreCliente = document.getElementById('nombreCliente').value;
    const productoVenta = document.getElementById('productoVenta').value;
    const cantidadVenta = document.getElementById('cantidadVenta').value;
    const precioVenta = document.getElementById('precioVenta').value;
    const totalVenta = document.getElementById('totalVenta').value;

    if (nombreCliente && productoVenta && cantidadVenta && precioVenta && totalVenta) {
        ventas.push({ cliente: nombreCliente, producto: productoVenta, cantidad: cantidadVenta, total: totalVenta });
        alert('Venta registrada con éxito');
        verTodos('ventas');
    } else {
        alert('Por favor completa todos los campos.');
    }
}

// Calcular el total de la venta
function calcularTotal() {
    const cantidad = document.getElementById('cantidadVenta').value;
    const precio = document.getElementById('precioVenta').value;
    const total = cantidad * precio;
    document.getElementById('totalVenta').value = total.toFixed(2);
}

// Guardar un proveedor
function guardarProveedor() {
    const nombreProveedor = document.getElementById('nombreProveedor').value;
    if (nombreProveedor) {
        proveedores.push(nombreProveedor);
        alert('Proveedor agregado con éxito');
        verTodos('proveedores');
    } else {
        alert('Por favor ingresa un nombre de proveedor.');
    }
}

// Registrar una compra
function registrarCompra() {
    const productoCompra = document.getElementById('productoCompra').value;
    const categoriaCompra = document.getElementById('categoriaCompra').value;
    const cantidadCompra = document.getElementById('cantidadCompra').value;
    const precioCompra = document.getElementById('precioCompra').value;
    const totalCompra = document.getElementById('totalCompra').value;

    if (productoCompra && categoriaCompra && cantidadCompra && precioCompra && totalCompra) {
        compras.push({ producto: productoCompra, categoria: categoriaCompra, cantidad: cantidadCompra, total: totalCompra });
        alert('Compra registrada con éxito');
        verTodos('compras');
    } else {
        alert('Por favor completa todos los campos.');
    }
}

// Calcular el total de la compra
function calcularTotalCompra() {
    const cantidad = document.getElementById('cantidadCompra').value;
    const precio = document.getElementById('precioCompra').value;
    const total = cantidad * precio;
    document.getElementById('totalCompra').value = total.toFixed(2);
}

// Mostrar todos los productos en formato de tabla
function verTodos(tipo) {
    let lista = '';
    switch (tipo) {
        case 'productos':
            lista = productos.length > 0 
                ? productos.map(p => `
                    <tr>
                        <td>${p.nombre}</td>
                        <td>${p.categoria}</td>
                        <td>${p.precio}</td>
                        <td><img src="${p.imagen}" alt="${p.nombre}" style="width: 50px; height: 50px;"></td>
                    </tr>`).join('') 
                : '<p>No hay productos registrados.</p>';
            document.getElementById('tablaProductosBody').innerHTML = lista;
            break;
            
        case 'categorias':
            lista = categorias.length > 0 
                ? categorias.map(c => `<p>Categoría: ${c}</p>`).join('') 
                : '<p>No hay categorías registradas.</p>';
            document.getElementById('listaCategorias').innerHTML = lista;
            break;
            
        case 'ventas':
            lista = ventas.length > 0 
                ? ventas.map(v => `<p>Cliente: ${v.cliente}, Producto: ${v.producto}, Cantidad: ${v.cantidad}, Total: $${v.total}</p>`).join('') 
                : '<p>No hay ventas registradas.</p>';
            document.getElementById('listaVentas').innerHTML = lista;
            break;
            
        case 'proveedores':
            lista = proveedores.length > 0 
                ? proveedores.map(p => `<p>Proveedor: ${p}</p>`).join('') 
                : '<p>No hay proveedores registrados.</p>';
            document.getElementById('listaProveedores').innerHTML = lista;
            break;
            
        case 'compras':
            lista = compras.length > 0 
                ? compras.map(c => `<p>Producto: ${c.producto}, Categoría: ${c.categoria}, Cantidad: ${c.cantidad}, Total: $${c.total}</p>`).join('') 
                : '<p>No hay compras registradas.</p>';
            document.getElementById('listaCompras').innerHTML = lista;
            break;
            
        default:
            alert('Sección no encontrada');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    toggleSection('productos');
    actualizarSelectCategorias();  // Inicializar las categorías en los select
});



