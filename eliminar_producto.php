<?php
include 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM productos WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        header("Location: panel.php"); // Redirigir al panel después de eliminar
        exit();
    } else {
        echo "Error al eliminar producto: " . $conn->error;
    }
    $stmt->close();
}
$conn->close();

