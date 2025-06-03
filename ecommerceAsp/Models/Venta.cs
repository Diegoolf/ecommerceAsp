using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ecommerceAsp.Models
{
    public class Venta
    {
        [Key]
        public int VentaId { get; set; }

        [Required]
        public string UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public IdentityUser Usuario { get; set; }

        public int? DireccionEnvioId { get; set; }

        public DireccionEnvio DireccionEnvio { get; set; }

        public ICollection<DetalleVenta> Detalles { get; set; }
    }
}
