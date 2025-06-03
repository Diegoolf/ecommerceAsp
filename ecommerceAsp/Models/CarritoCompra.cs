using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
namespace ecommerceAsp.Models
{
    public class CarritoCompra
    {
        [Key]
        public int CarritoCompraId { get; set; }

        [Required]
        public string UsuarioId { get; set; }

        public IdentityUser Usuario { get; set; }

        [Required]
        public int ProductoId { get; set; }

        public Producto Producto { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor a cero")]
        public int Cantidad { get; set; }
    }
}
