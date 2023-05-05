using AutoMapper;
using BackMascota.Models;
using BackMascota.Models.DTO;
using BackMascota.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackMascota.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        
        private readonly IMapper _mapper;
        private readonly IMascotaRepository _mascotaRepository;

        public MascotaController(IMapper mapper, IMascotaRepository mascotaRepository)
        {
            this._mapper = mapper;
            _mascotaRepository = mascotaRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var mascotas = await _mascotaRepository.GetMascotas();
                var mascotaDto = _mapper.Map<IEnumerable<MascotaDTO>>(mascotas);
                return Ok(mascotaDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            } 
        }

        [HttpGet("{id}")]
       
        public async Task<IActionResult>GetMascota(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetMascotaId(id);
                if (mascota == null)
                {
                    return NotFound();
                }
                var mascotaDto= _mapper.Map<MascotaDTO>(mascota);
                return Ok(mascotaDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMascota(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetMascotaId(id);
                if(mascota == null)
                {
                    return NotFound();
                }
                await _mascotaRepository.DeleteMascota(mascota);
                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }  
        }

        [HttpPost]
        public async Task<IActionResult> AddMascota(MascotaDTO mascotaDto)
        {
            try
            {
            var mascota = _mapper.Map<Mascota>(mascotaDto);
            mascota.FechaCreacion=DateTime.Now;
            mascota=await _mascotaRepository.AddMascota(mascota);
                var mascotaItemDto = _mapper.Map<MascotaDTO>(mascota);
                //Para que se muestre el objeto en consola
                return CreatedAtAction("Get",new {id= mascotaItemDto.Id}, mascotaItemDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> EditMascota(int id, MascotaDTO mascotaDto)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDto);
                var mascotaItem = await _mascotaRepository.GetMascotaId(id);
                if (id != mascota.Id)
                {
                    BadRequest();
                }
                await _mascotaRepository.UpdateMascota(mascota);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
