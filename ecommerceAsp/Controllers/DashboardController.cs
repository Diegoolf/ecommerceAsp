using ecommerceAsp.Data;
using ecommerceAsp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ecommerceAsp.Controllers
{
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DashboardController (ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: DashboardController
        public ActionResult Inicio()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ObtenerProductos()
        {
            var productos = _context.Productos.ToList();
            return Json(productos);

        }

        // POST: DashboardController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CrearProducto(Producto producto, IFormFile Imagen)
        {
            if (ModelState.IsValid)
            {

                if (Imagen != null && Imagen.Length > 0)
                {
                    // Carpeta donde se guardarán las imágenes
                    var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img/productos");
                    if (!Directory.Exists(uploads))
                        Directory.CreateDirectory(uploads);

                    // Nombre único para la imagen
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(Imagen.FileName);
                    var filePath = Path.Combine(uploads, fileName);

                    // Guardar el archivo
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        Imagen.CopyTo(stream);
                    }

                    // Guardar la ruta relativa en la BD
                    producto.ImagenUrl = "/img/productos/" + fileName;
                }

                _context.Productos.Add(producto);
                _context.SaveChanges();
                return Json(new { success = true, message = "¡Producto creado correctamente!" });
            }


            var errores = ModelState
            .Where(x => x.Value.Errors.Count > 0)
            .Select(x => new { Campo = x.Key, Errores = x.Value.Errors.Select(e => e.ErrorMessage) })
            .ToList();

            return BadRequest(new { success = false, message = "¡algo salio mal, no se pudo crear!", errores });
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditarProducto(int Id, string Nombre, string Descripcion, int CategoriaId, int Precio, int Stock)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.ProductoId == Id);
            if (producto == null)
            {
                return BadRequest(new { success = false, message = "¡producto no encontrado!" });
            }

            if (ModelState.IsValid)
            {
                producto.Nombre = Nombre;
                producto.Descripcion = Descripcion;
                producto.CategoriaId = CategoriaId;
                producto.Precio = Precio;
                producto.Stock = Stock;
                _context.SaveChanges();
                return Json(new { success = true, message = "¡producto editado correctamente!" });
            }

            return BadRequest(new { success = false, message = "¡Hubo un error!" });
        }

 
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CambiarImagen(int Id, IFormFile Imagen)
        {
            var producto = _context.Productos.FirstOrDefault(p => p.ProductoId == Id);
            if (producto == null)
            {
                return BadRequest(new { success = false, message = "¡producto no encontrado!" });
            }


            if (Imagen != null && Imagen.Length > 0)
            {
                // Carpeta donde se guardarán las imágenes
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img/productos");
                if (!Directory.Exists(uploads))
                    Directory.CreateDirectory(uploads);

                // Nombre único para la imagen
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(Imagen.FileName);
                var filePath = Path.Combine(uploads, fileName);

                // Guardar el archivo
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    Imagen.CopyTo(stream);
                }

                // Guardar la ruta relativa en la BD
                producto.ImagenUrl = "/img/productos/" + fileName;
            }

            _context.SaveChanges();
            return Json(new { success = true, message = "¡Imagen actualizada correctamente!" });
        }
    }
}
