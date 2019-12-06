using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository;
using BelaVista.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BelaVista.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingController : ControllerBase
    {
        private readonly IMeeting _context;
        private readonly IBelaVistaRepository _repo;

        public MeetingController(IMeeting context, IBelaVistaRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _context.GetAllMeetingsAsync());
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }
        [HttpPost()]
        public async Task<IActionResult> Post(Meeting meeting)
        {
            try
            {
                _repo.Add(meeting);
                if (await _repo.SaveChanges())
                {
                    return Created($"/api/meeting/{meeting.Id}", meeting);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

    }
}