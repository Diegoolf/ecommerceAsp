using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerceAsp.Models
{
    // Producto
    public class Producto
    {
        [Key]
        public int ProductoId { get; set; }

        [StringLength(150, ErrorMessage = "El nombre no puede tener más de 150 caracteres")]
        public string Nombre { get; set; }
        public string? Descripcion { get; set; }

        public decimal Precio { get; set; }

        public int Stock { get; set; }

        [ForeignKey("CategoriaId")]
        public int CategoriaId { get; set; }

        public Categoria? Categoria { get; set; }

        public string? ImagenUrl { get; set; }

        public ICollection<DetalleVenta> DetallesVenta { get; set; } = new List<DetalleVenta>();
        public ICollection<CarritoCompra> CarritoCompras { get; set; } = new List<CarritoCompra>();
    }
}
