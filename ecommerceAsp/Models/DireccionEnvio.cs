using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ecommerceAsp.Models
{
    public class DireccionEnvio
    {
        [Key]
        public int DireccionEnvioId { get; set; }

        [Required]
        public string UsuarioId { get; set; }

        public IdentityUser Usuario { get; set; }

        [Required]
        [StringLength(200)]
        public string Calle { get; set; }

        [StringLength(100)]
        public string Ciudad { get; set; }

        [StringLength(100)]
        public string Estado { get; set; }

        [StringLength(10)]
        public string CodigoPostal { get; set; }
    }
}
