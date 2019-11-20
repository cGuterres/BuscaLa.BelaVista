using System.Threading.Tasks;
using BelaVista.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BelaVista.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreRegistrationController : ControllerBase
    {
        private readonly IPreRegistration _repo;

        public PreRegistrationController(IPreRegistration repo)
        {
            _repo = repo;
        }

        [HttpGet("{cpf}/{ap}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string cpf, string ap){
            try
            {
                var results = await _repo.GetPreRegistration(cpf, ap);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }
    }
}