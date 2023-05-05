using AutoMapper;
using BackMascota.Models.DTO;

namespace BackMascota.Models.Profiles
{
    public class MascotaProfile: Profile
    {

        public MascotaProfile()
        {
            CreateMap<Mascota, MascotaDTO>();
            CreateMap<MascotaDTO, Mascota>();
        }
       
    }
}
