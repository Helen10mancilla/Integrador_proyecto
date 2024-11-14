document.getElementById("hamburgerBtn").addEventListener("click", function() {
    const slidebar = document.getElementById("controlPanel");
    const mainContent = document.getElementById("mainContent");
    
    slidebar.classList.toggle("active");
    mainContent.classList.toggle("shrink");
});

document.querySelectorAll('.element-slidebar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.classList.toggle('active');
    });
});

    var ctx = document.getElementById('graficaProductos').getContext('2d');
    var graficaProductos = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Electrónica', 'Ropa', 'Hogar', 'Libros', 'Otros'],
            datasets: [{
                label: 'Cantidad de Productos',
                data: [50, 30, 20, 10, 15],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

// Arrays para almacenar productos y categorías
let productos = [];
let categorias = [];

// Mostrar formulario de agregar categoría
document.getElementById('agregarCategoriaBtn').addEventListener('click', () => {
    document.getElementById('categoriaForm').style.display = 'block';
    document.getElementById('productoForm').style.display = 'none';
    document.getElementById('productosLista').style.display = 'none';
    document.getElementById('categoriasLista').style.display = 'none';
});

// Agregar una nueva categoría
function agregarCategoria() {
    let nuevaCategoria = document.getElementById('nuevaCategoria').value;
    if (nuevaCategoria) {
        categorias.push(nuevaCategoria);
        actualizarCategorias();
        document.getElementById('nuevaCategoria').value = '';
        alert('Categoría agregada con éxito');
    } else {
        alert('Por favor, ingresa un nombre de categoría.');
    }
}

// Actualizar la lista de categorías en el formulario de agregar producto
function actualizarCategorias() {
    let categoriaSelect = document.getElementById('categoriaSelect');
    categoriaSelect.innerHTML = '<option value="">Selecciona una categoría</option>';
    categorias.forEach(categoria => {
        let option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriaSelect.appendChild(option);
    });

    // Mostrar lista de categorías
    let categoriasUl = document.getElementById('categoriasUl');
    categoriasUl.innerHTML = '';
    categorias.forEach(categoria => {
        let li = document.createElement('li');
        li.textContent = categoria;
        categoriasUl.appendChild(li);
    });
}

// Mostrar formulario de agregar producto
document.getElementById('agregarProductoBtn').addEventListener('click', () => {
    document.getElementById('categoriaForm').style.display = 'none';
    document.getElementById('productoForm').style.display = 'block';
    document.getElementById('productosLista').style.display = 'none';
    document.getElementById('categoriasLista').style.display = 'none';
});

// Agregar un nuevo producto
function agregarProducto() {
    let nuevoProducto = document.getElementById('nuevoProducto').value;
    let categoriaSeleccionada = document.getElementById('categoriaSelect').value;
    
    if (nuevoProducto && categoriaSeleccionada) {
        productos.push({ nombre: nuevoProducto, categoria: categoriaSeleccionada });
        actualizarProductos();
        document.getElementById('nuevoProducto').value = '';
        alert('Producto agregado con éxito');
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

// Actualizar la lista de productos
function actualizarProductos() {
    let productosTableBody = document.querySelector('#productosTable tbody');
    productosTableBody.innerHTML = '';
    productos.forEach((producto, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        productosTableBody.appendChild(row);
    });
}

// Eliminar un producto
function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarProductos();
}

// Ver lista de productos
document.getElementById('verProductosBtn').addEventListener('click', () => {
    document.getElementById('categoriaForm').style.display = 'none';
    document.getElementById('productoForm').style.display = 'none';
    document.getElementById('productosLista').style.display = 'block';
    document.getElementById('categoriasLista').style.display = 'none';
});

// Ver lista de categorías
document.getElementById('verCategoriasBtn').addEventListener('click', () => {
    document.getElementById('categoriaForm').style.display = 'none';
    document.getElementById('productoForm').style.display = 'none';
    document.getElementById('productosLista').style.display = 'none';
    document.getElementById('categoriasLista').style.display = 'block';
});
