using System.Threading.Tasks;
using BelaVista.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BelaVista.API.Controllers
{
    [ApiController]
    [Route("site/[controller]")]
    public class CondominiumController : ControllerBase
    {
        private readonly ICondominum _repo;
        public CondominiumController(ICondominum repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllCondominiunsAsync();
                return Ok(results);
            }
            catch(System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados sem acesso.");
            }
        }
    }
}