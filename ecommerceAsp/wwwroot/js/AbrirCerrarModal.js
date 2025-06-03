$(document).ready(function () {
    //modal agregar producto
    // Abrir modal
    $('.btnAbrirModal').click(function () {
        $('#ModalAgregarProducto').modal('show');
    });

    // Cerrar modal
    $('.btnCerrarModal').click(function () {
        $('#ModalAgregarProducto').modal('hide');
    });
})