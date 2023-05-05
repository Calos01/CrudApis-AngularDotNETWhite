using Microsoft.EntityFrameworkCore;

namespace BackMascota.Models
{
    public class MascotasContext:DbContext
    {
        public MascotasContext(DbContextOptions<MascotasContext> options) : base(options)
        {
        }

        public DbSet<Mascota> Mascotas { get; set; } = null!;
    }
}
