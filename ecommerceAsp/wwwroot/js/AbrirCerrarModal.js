$(document).ready(function () {
    //modal agregar producto
    // Abrir modal
    $('.btnAbrirModal').click(function () {
        $('#ModalAgregarProducto').modal('show');
        cargarCategoriasEnSelect();
    });

    // Cerrar modal
    $('.btnCerrarModal').click(function () {
        $('#ModalAgregarProducto').modal('hide');
    });

    //modal agregar categoria
    // Abrir modal
    $('.btnAbrirModalCategoria').click(function () {
        $('#ModalAgregarCategoria').modal('show');
    });

    // Cerrar modal
    $('.btnCerrarModal').click(function () {
        $('#ModalAgregarCategoria').modal('hide');
    });

    $(document).on('click', '.btnAbrirModalAct', function () {
        var id = $(this).data('id');
        $('#inputIdProductoAct').val(id);

        var estatus = $(this).data('estatus');
        if (estatus === true) {
            $('.SpanAct').text("Desactivar")
        } else if (estatus === false) {
            $('.SpanAct').text("Activar")
        }

        var nombre = $(this).data('nombre');
        $('.SpanNombre').text(nombre)

        const modal = new bootstrap.Modal(document.getElementById('ModalActivar'));
        modal.show();
    });

    // Cerrar modal
    $(document).on('click', '.btnCerrarModalAct', function () {
        $('#ModalActivar').modal('hide');
    });


    //modal editar categoria
    // Abrir modal
    $(document).on('click', '.btnAbrirModalEditar', function () {
        var id = $(this).data('id');
        $('#inputIdProductoEdit').val(id);

        var nombre = $(this).data('nombre');
        $('#inpNombreEdit').val(nombre)

        var descripcion = $(this).data('descripcion');
        $('#txtDescripcionEdit').val(descripcion);

        const modal = new bootstrap.Modal(document.getElementById('ModalEditarCategoria'));
        modal.show();
    });

    // Cerrar modal
    $(document).on('click', '.btnCerrarModalEditar', function () {
        $('#ModalEditarCategoria').modal('hide');
    });

    //modal editar producto
    // Abrir modal
    $(document).on('click', '.btnAbrirModalEdit', function () {
        
        var id = $(this).data('id');
        $('#inputIdProductoEdit').val(id);

        var nombre = $(this).data('nombre');
        $('#nombreProductoEdit').val(nombre)

        var descripcion = $(this).data('descripcion');
        $('#descripcionProductoEdit').val(descripcion);

        var categoria = $(this).data('categoria');
        $('#selectCategoriaEdit').val(categoria);

        var precio = $(this).data('precio');
        $('#precioEdit').val(precio);

        var stock = $(this).data('stock');
        $('#stockEdit').val(stock);
            
        $('#ModalEditarProducto').modal('show');
        
    });

    // Cerrar modal
    $('.btnCerrarModalEdit').click(function () {
        $('#ModalEditarProducto').modal('hide');
    });
})