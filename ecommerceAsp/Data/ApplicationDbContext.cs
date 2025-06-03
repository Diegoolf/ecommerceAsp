using ecommerceAsp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ecommerceAsp.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<DetalleVenta> DetallesVenta { get; set; }
        public DbSet<DireccionEnvio> DireccionesEnvio { get; set; }
        public DbSet<CarritoCompra> CarritoCompras { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Categoria - Producto (1 a muchos)
            builder.Entity<Producto>()
                .HasOne(p => p.Categoria)
                .WithMany(c => c.Productos)
                .HasForeignKey(p => p.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);

            // Producto - DetalleVenta (1 a muchos)
            builder.Entity<DetalleVenta>()
                .HasOne(dv => dv.Producto)
                .WithMany(p => p.DetallesVenta)
                .HasForeignKey(dv => dv.ProductoId)
                .OnDelete(DeleteBehavior.Restrict);

            // Venta - DetalleVenta (1 a muchos)
            builder.Entity<DetalleVenta>()
                .HasOne(dv => dv.Venta)
                .WithMany(v => v.Detalles)
                .HasForeignKey(dv => dv.VentaId)
                .OnDelete(DeleteBehavior.Cascade);

            // Usuario - Venta (1 a muchos)
            builder.Entity<Venta>()
                .HasOne(v => v.Usuario)
                .WithMany() // <-- Sin lambda
                .HasForeignKey(v => v.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            // Venta - DireccionEnvio (muchos a 1, nullable)
            builder.Entity<Venta>()
                .HasOne(v => v.DireccionEnvio)
                .WithMany()
                .HasForeignKey(v => v.DireccionEnvioId)
                .OnDelete(DeleteBehavior.Restrict);

            // Usuario - DireccionEnvio (1 a muchos)
            builder.Entity<DireccionEnvio>()
                .HasOne(d => d.Usuario)
                .WithMany() // <-- Sin lambda
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            // Usuario - CarritoCompra (1 a muchos)
            builder.Entity<CarritoCompra>()
                .HasOne(c => c.Usuario)
                .WithMany() // <-- Sin lambda
                .HasForeignKey(c => c.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            // Producto - CarritoCompra (1 a muchos)
            builder.Entity<CarritoCompra>()
                .HasOne(c => c.Producto)
                .WithMany(p => p.CarritoCompras)
                .HasForeignKey(c => c.ProductoId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
