using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository;
using BelaVista.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BelaVista.API.Controllers
{
    [ApiController]
    [Route("site/[controller]")]
    public class WarningController : ControllerBase
    {
        private readonly IWarning _repo;
        private readonly IBelaVistaRepository _repositoryContext;
        public WarningController(IWarning repo, IBelaVistaRepository repositoryContext)
        {
            _repo = repo;
            _repositoryContext = repositoryContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllWarningsAsync();

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpGet("{warningId}")]
        public async Task<IActionResult> Get(int warningId)
        {
            try
            {
                var results = await _repo.GetWarningAsyncById(warningId);
                if (results != null)
                {
                    return Ok(results);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest("Nenhum registro encontrado.");
        }

        [HttpPost()]
        public async Task<IActionResult> Post(Warning warning)
        {
            try
            {
                _repositoryContext.Add(warning);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/site/warning/{warning.Id}", warning);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{warningId}")]
        public async Task<IActionResult> Put(int warningId, Warning model)
        {
            try
            {
                //verifica se o registro existe para realizar atualização
                var warning = await _repo.GetWarningAsyncById(warningId);
                if (warning == null) return NotFound();

                _repositoryContext.Update(model);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/site/warning/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{warningId}")]
        public async Task<IActionResult> Delete(int warningId)
        {
            try
            {
                var obj = await _repo.GetWarningAsyncById(warningId);
                if (obj == null) return NotFound("Não encontrado.");

                _repositoryContext.Delete(obj);
                if (await _repositoryContext.SaveChanges())
                {
                    return Ok();
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