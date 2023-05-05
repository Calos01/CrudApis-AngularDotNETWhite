using Microsoft.EntityFrameworkCore;

namespace BackMascota.Models.Repository
{
    public class MascotaRepository: IMascotaRepository
    {
        private readonly MascotasContext _context;
        public MascotaRepository(MascotasContext context)
        {
            this._context = context;
        }

        public async Task<List<Mascota>> GetMascotas()
        {
            return await _context.Mascotas.ToListAsync();
        }

        public async Task<Mascota> GetMascotaId(int id)
        {
            var mascota=await _context.Mascotas.FindAsync(id);
            return mascota;
        }

        public async Task DeleteMascota(Mascota mascota)
        {
            _context.Mascotas.Remove(mascota);
            await _context.SaveChangesAsync();

        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            _context.Add(mascota);
            await _context.SaveChangesAsync();
            return mascota;
        }

        public async Task UpdateMascota(Mascota mascota)
        {
            var mascotaItem = await _context.Mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);
            mascotaItem.Nombre = mascota.Nombre;
            mascotaItem.Raza = mascota.Raza;
            mascotaItem.Edad = mascota.Edad;
            mascotaItem.Peso = mascota.Peso;
            mascotaItem.Color = mascota.Color;

            await _context.SaveChangesAsync();
        }
    }
}
