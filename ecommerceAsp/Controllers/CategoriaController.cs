using ecommerceAsp.Data;
using ecommerceAsp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace ecommerceAsp.Controllers
{
    public class CategoriaController : Controller
    {

        private readonly ApplicationDbContext _context;

        public CategoriaController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: CategoriaController
        public ActionResult InicioC()
        {
            var categorias = _context.Categorias.ToList();
            return View(categorias);
        }

        // GET: CategoriaController/Details/5
        public ActionResult ObtenerCategorias()
        {
            var categorias = _context.Categorias.ToList();
            return Json(categorias);
        }


        // POST: CategoriaController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Crear(Categoria categoria)
        {
            if (ModelState.IsValid)
            {
                _context.Categorias.Add(categoria);
                _context.SaveChanges();
                return Json(new { success = true, message = "¡Categoria creada correctamente!" });
            }

            return BadRequest(new { success = false, message = "¡algo salio mal, no se pudo crear!" }); 
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CambiarEstado(int id )
        {
            var categoria = _context.Categorias.FirstOrDefault(c => c.CategoriaId == id);
            if (categoria == null)
            {
                return BadRequest(new { success = false, message = "¡Categoria no encontrada!" });
            }

            categoria.Activa = !categoria.Activa;

            // 4. Guardar los cambios en la base de datos
            _context.SaveChanges();

            // 5. Mensaje de éxito
            return Json(new { success = true, message = "¡Estatus actualizado correctamente!" });
        }

  

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditarCategoria(int id, string Nombre, string Descripcion)
        {
            var categoria = _context.Categorias.FirstOrDefault(c => c.CategoriaId == id);
            if (categoria == null)
            {
                return BadRequest(new { success = false, message = "¡Categoria no encontrado!" });
            }
            categoria.Nombre = Nombre;
            categoria.Descripcion = Descripcion;
            _context.SaveChanges();
            return Json(new { success = true, message = "¡Categoria editada correctamente!" });
        }
    }
}
