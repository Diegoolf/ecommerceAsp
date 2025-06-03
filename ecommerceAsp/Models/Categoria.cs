using System.ComponentModel.DataAnnotations;

namespace ecommerceAsp.Models
{
    public class Categoria
    {
        [Key]
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "El nombre no puede tener más de 100 caracteres")]
        public string Nombre { get; set; }

        public ICollection<Producto> Productos { get; set; }
    }
}
