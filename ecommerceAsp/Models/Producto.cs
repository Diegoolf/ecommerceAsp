using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerceAsp.Models
{
    // Producto
    public class Producto
    {
        [Key]
        public int ProductoId { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(150, ErrorMessage = "El nombre no puede tener más de 150 caracteres")]
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        [Required]
        public decimal Precio { get; set; }

        public int Stock { get; set; }

        [Required]
        [ForeignKey("Categoria")]
        public int CategoriaId { get; set; }

        public Categoria Categoria { get; set; }

        // Aquí puedes guardar la ruta o URL de la imagen del producto
        [StringLength(250)]
        public string ImagenUrl { get; set; }

        public ICollection<DetalleVenta> DetallesVenta { get; set; }
        public ICollection<CarritoCompra> CarritoCompras { get; set; }
    }
}
