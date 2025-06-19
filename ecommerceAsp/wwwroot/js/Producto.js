
function CrearProducto() {
    $(document).ready(function () {
        $('#formCrearProducto').on('submit', function (e) {
            e.preventDefault();
            var formData = new FormData();

            formData.append('Nombre', $('#nombreProducto').val());
            formData.append('Descripcion', $('#descripcionProducto').val());
            formData.append('CategoriaId', $('#selectCategoria').val());
            formData.append('Precio', $('#precio').val());
            formData.append('Stock', $('#stock').val());
            formData.append('Imagen', $('#formFile')[0].files[0]); 
            formData.append('__RequestVerificationToken', $('input[name="__RequestVerificationToken"]').val());
            // ... (tu código anterior)
            console.log('Contenido de FormData:');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

            $.ajax({
                url: '/Dashboard/CrearProducto',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    $('#ModalAgregarProducto').modal('hide');
                    Swal.fire({
                        title: '¡Producto agregado!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    mostrarProducto();
                },
                error: function (xhr, status, error) {
                    console.error('Error al crear el producto:', error);
                    console.log(xhr.responseJSON?.errores)
                    Swal.fire({
                        title: 'algo salio mal',
                        text: xhr.responseJSON?.message || 'Error desconocido',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        });

    });
}

function editarProducto() {
    $('#formEditarProducto').on('submit', function (e) {
        e.preventDefault();
        var id = $('#inputIdProductoEdit').val();
        var nombre = $('#nombreProductoEdit').val();
        var descripcion = $('#descripcionProductoEdit').val();
        var categoriaId = $('#selectCategoriaEdit').val();
        var precio = $('#precioEdit').val();
        var stock = $('#stockEdit').val();
        var token = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: '/Dashboard/EditarProducto',
            method: 'POST',
            data: { Id: id, Nombre: nombre, Descripcion: descripcion, categoriaId: categoriaId, Precio: precio, Stock: stock },
            headers: {
                'RequestVerificationToken': token
            },
            success: function (data) {
                $('#ModalEditarProducto').modal('hide');
                Swal.fire({
                    title: '¡Producto editado!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                mostrarProducto();
            },
            error: function (xhr, status, error) {
                console.error('Error al editar el producto:', error);
                console.log(xhr.responseJSON?.errores)
                Swal.fire({
                    title: 'algo salio mal',
                    text: xhr.responseJSON?.message || 'Error desconocido',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });
}


function cargarCategoriasEnSelect() {
    $.ajax({
        url: '/Categoria/ObtenerCategorias',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var $select = $('#selectCategoria');
            $select.empty();
            $select.append('<option selected disabled>Selecciona una categoría</option>');
            data.forEach(function (cat) {
                $select.append('<option value="' + cat.categoriaId + '">' + cat.nombre + '</option>');
            });

            var $select2 = $('#selectCategoriaEdit');
            $select2.empty();
            $select2.append('<option selected disabled>Selecciona una categoría</option>');
            data.forEach(function (cat) {
                $select2.append('<option value="' + cat.categoriaId + '">' + cat.nombre + '</option>');
            });
        },
        error: function () {
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las categorías',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}


function mostrarProducto() {
    $.ajax({
        url: '/Dashboard/ObtenerProductos',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            $('#contProductos').empty();
            var html = '';
            data.forEach(function (producto) {
                html = `<div class="col card1" style="width:16.9vw">
    <div class="card rounded" style="box-shadow: 0 0.8px 4px 0 #b5ccdc;">

        <!-- Contenedor relativo para posicionar el botón -->
        <div style="position: relative;">
            <img src="${producto.imagenUrl}" class="card-img-top img-fluid" style="height:160px; object-fit:contain;" alt="...">
            <label style="position: absolute; bottom: 5px; right: 5px; cursor: pointer;">
                <input type="file" accept="image/*" class="btnImagen" id="btnImagen${producto.productoId}" style="display: none;" data-id="${producto.productoId}">
                <span style="box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .12); background-color: #b5ccdc;" class="btn btn-sm fs-6 mb-0"><i class="bi bi-image"></i></span>
            </label>
        </div>

        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text mb-0 text-truncate">${producto.descripcion}</p>
            <p class="card-text d-flex justify-content-between">
                <small class="text-truncate">Precio: $${producto.precio}</small>
                <small class="text-truncate">Stock: ${producto.stock} ${producto.stock > 1 ? "Disponibles" : "Disponible"}</small>
                
            </p>
            <a style="background-color: #7ca4c4;" class="btn btn-sm"><i class="bi bi-power"></i></a>
            <a style="background-color: #b4ccd4" class="btn btn-sm btnAbrirModalEdit"
               data-id="${producto.productoId}" data-nombre="${producto.nombre}"
               data-descripcion="${producto.descripcion}" data-stock="${producto.stock}"
               data-precio="${producto.precio}" data-categoria="${producto.categoriaId}" title="Editar">
               <i class="bi bi-pencil-square"></i>
            </a>
        </div>
    </div>
</div>`;



             $('#contProductos').append(html);
            });
            

           
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener productos:', error);
        }
    });
}


function cambiarImagen() {
    $(document).on('change', '.btnImagen', function () {
        var token = $('meta[name="csrf-token"]').attr('content');
        var id = $(this).data('id');
        var imagen = $(`#btnImagen${id}`)[0].files[0];
        console.log(imagen)
        var formData = new FormData();
        formData.append('Id', id);
        formData.append('Imagen', imagen);

        $.ajax({
            url: '/Dashboard/CambiarImagen',
            method: 'POST',
            data: formData,
            contentType: false,  // Muy importante
            processData: false,  // Muy importante
            headers: {
                'RequestVerificationToken': token
            },
            success: function (data) {
                Swal.fire({
                    title: '¡Actualizacion exitosa!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                mostrarProducto();
            },
            error: function (xhr, status, error) {
                console.error('Error al cambiar imagen del producto:', error);
                Swal.fire({
                    title: 'Algo salió mal',
                    text: xhr.responseJSON?.message || 'Error desconocido',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });


}

$(document).ready(function () {
    CrearProducto();
    mostrarProducto();
    cargarCategoriasEnSelect();
    editarProducto();
    cambiarImagen();
})
