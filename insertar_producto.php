<?php
include 'db.php'; // Incluir la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre_producto = $_POST['nombreProducto'];
    $precio_producto = $_POST['precioProducto'];

    // Inserción en la base de datos
    $sql = "INSERT INTO productos (nombre_producto, precio) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sd", $nombre_producto, $precio_producto); // 's' para string, 'd' para double

    if ($stmt->execute()) {
        header("Location: panel.php"); // Redirigir de vuelta al panel
        exit();
    } else {
        echo "Error al agregar producto: " . $conn->error;
    }
    $stmt->close();
}
$conn->close();

