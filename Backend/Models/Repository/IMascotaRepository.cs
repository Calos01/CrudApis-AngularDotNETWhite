namespace BackMascota.Models.Repository
{
    public interface IMascotaRepository
    {
        public Task<List<Mascota>> GetMascotas();
        public Task<Mascota> GetMascotaId(int id);
        public Task DeleteMascota(Mascota mascota);
        public Task<Mascota> AddMascota(Mascota mascota);
        public Task UpdateMascota(Mascota mascota);

    }
}
