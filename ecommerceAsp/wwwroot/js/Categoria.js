function CrearCategoria() {
    $(document).ready(function () {
        $('#formCrearCategoria').submit(function(e){
            e.preventDefault();
            var nombre = $('#nombreCategoria').val();
            var descripcion = $('#descripcionCategoria').val();
            $.ajax({
                url:'/Categoria/Crear' ,
                method: 'POST',
                data: { nombre, descripcion },
                headers: {
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                },
                success: function (data) {
                    $('#ModalAgregarCategoria').modal('hide');
                    Swal.fire({
                        title: '¡Categoria agregada!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                },
                error: function (xhr, status, error) {
 console.error('Error al crear el producto:', error);
                    Swal.fire({
                        title: 'algo salio mal',
                        text: xhr.responseJSON.message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            })
        });
    });
}



function editarCategoria() {
    $('#formEditarCategoria').submit(function (e) {
        e.preventDefault();
        var inpNombre = $('#inpNombreEdit').val()
        var inpDescripcion = $('#txtDescripcionEdit').val()
        var id = $('#inputIdProductoEdit').val();
        var token = $('input[name="__RequestVerificationToken"]').val();
        $.ajax({
            url: '/Categoria/EditarCategoria',
            method: 'POST',
            data: { id: id, Nombre: inpNombre, Descripcion: inpDescripcion, __RequestVerificationToken: token },
            success: function (data) {
                $('#ModalEditarCategoria').modal('hide');
                Swal.fire({
                    title: '¡Categoria editada!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                mostrarCategorias();

            },
            error: function (xhr, status, error) {
                console.error('Error al editar el producto:', error);
                Swal.fire({
                    title: 'algo salio mal',
                    text: xhr.responseJSON.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });

            }
        })

    });
}


function activarDesactivar() {
    $(document).on('click', '#btnActualizarEstatus', function (e) {
        e.preventDefault();
        var id = $('#inputIdProductoAct').val();
        var token = $('input[name="__RequestVerificationToken"]').val();
        $.ajax({
            url: '/Categoria/CambiarEstado',
            method: 'POST',
            data: { id: id, __RequestVerificationToken: token },
            success: function (data) {
                $('#ModalActivar').modal('hide');
                Swal.fire({
                    title: '¡Categoria activada/desactivada!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                mostrarCategorias();
            },
            error: function (xhr, status, error) {
                console.error('Error al editar la categoria:', error);
                Swal.fire({
                    title: 'algo salio mal',
                    text: xhr.responseJSON.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
    });
}

function mostrarCategorias() {
    $.ajax({
        url: '/Categoria/ObtenerCategorias',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            window.gridApi.setGridOption('rowData', data);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener categorias:', error);
        }
    });
}




document.addEventListener('DOMContentLoaded', function () {
    const { createGrid, ThemeQuartz } = agGrid;

    const columnDefs = [
        { headerName: "Nombre", field: "nombre", flex: 2 },
        { headerName: "Descripcion", field: "descripcion", flex: 3 },
        { headerName: "Fecha de creacion", field: "fechaCreacion", flex: 1 },
        {
            headerName: "Estatus", field: "activa", flex: 0.8, cellRenderer: function (params) {
                if (params.value === true) {
                    return '<span style="background-color: #57ae89" class="badge ">Activo</span>';
                } else {
                    return '<span style="background-color: #f26545" class="badge ">Inactivo</span>';
                }
            } 
        },
        {
            headerName: "Acciones", field: "acciones", flex: 1.2, cellRenderer: function (params) {
                // Usa el id del producto para identificar la fila
                if (params.data.activa === true) {
                    return `
                    <button  style="background-color: #f26545" class="btn btn-sm  btnAbrirModalAct " data-id="${params.data.categoriaId}" data-estatus="${params.data.activa}" data-nombre="${params.data.nombre}" data-toggle="tooltip" data-placement="top" title="Activar/Desactivar producto" > <i class="bi bi-power"></i> </button>
                    <button style="background-color: #b4ccd4" class="btn btn-sm btnAbrirModalEditar " data-id="${params.data.categoriaId}" data-nombre="${params.data.nombre}" data-descripcion="${params.data.descripcion}" data data-toggle="tooltip" data-placement="top" title="Editar producto"> <i class="bi bi-pencil-square"></i> </button>
          `;
                } else if (params.data.activa === false) {
                    return `
                    <button  style="background-color: #57ae89"  class="btn btn-sm btnAbrirModalAct " data-id="${params.data.categoriaId}" data-estatus="${params.data.activa}" data-nombre="${params.data.nombre}" data-toggle="tooltip" data-placement="top" title="Activar/Desactivar producto" > <i class="bi bi-power"></i> </button>
              `;
                }

            }
        }
    ];



    const gridOptions = {
        theme: ThemeQuartz,
        columnDefs: columnDefs,
        rowData: null,
        animateRows: true,
        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true
        },
        onGridReady: function (params) {
            window.gridApi = params.api;
            mostrarCategorias();
        }

    };


    const gridDiv = document.querySelector('#myGrid');
    createGrid(gridDiv, gridOptions); // ✅ en lugar de new agGrid.Grid(...)


});

$(document).ready(function () {
    CrearCategoria();
    activarDesactivar()
    editarCategoria()
})