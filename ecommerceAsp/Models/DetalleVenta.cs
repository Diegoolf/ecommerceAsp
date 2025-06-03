using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerceAsp.Models
{
    public class DetalleVenta
    {
        [Key]
        public int DetalleVentaId { get; set; }

        [Required]
        [ForeignKey("Venta")]
        public int VentaId { get; set; }

        public Venta Venta { get; set; }

        [Required]
        [ForeignKey("Producto")]
        public int ProductoId { get; set; }

        public Producto Producto { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor a cero")]
        public int Cantidad { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "El precio debe ser positivo")]
        public decimal PrecioUnitario { get; set; }
    }
}
