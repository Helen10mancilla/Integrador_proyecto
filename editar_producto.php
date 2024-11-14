<?php
include 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Consultar el producto
    $sql = "SELECT * FROM productos WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $producto = $result->fetch_assoc();
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre_producto = $_POST['nombre_producto'];
    $precio_producto = $_POST['precio_producto'];

    // Actualizar el producto
    $sql = "UPDATE productos SET nombre_producto = ?, precio = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sdi", $nombre_producto, $precio_producto, $id);

    if ($stmt->execute()) {
        header("Location: panel.php");
        exit();
    } else {
        echo "Error al actualizar el producto: " . $conn->error;
    }
    $stmt->close();
}


