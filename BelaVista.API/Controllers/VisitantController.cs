using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository;
using BelaVista.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BelaVista.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitantController : ControllerBase
    {
        private readonly IVisitant _repo;
        private readonly IBelaVistaRepository _repositoryContext;
        public VisitantController(IVisitant repo, IBelaVistaRepository repositoryContext)
        {
            _repo = repo;
            _repositoryContext = repositoryContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllVisitantsAsync();

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpGet("{visitantId}")]
        public async Task<IActionResult> Get(int visitantId)
        {
            try
            {
                var results = await _repo.GetVisitantAsyncById(visitantId);
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

        [HttpGet("getByName/{name}")]
        public async Task<IActionResult> Get(string name)
        {
            try
            {
                var results = await _repo.GetVisitantByNameAsync(name);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> Post(Visitant visitant)
        {
            try
            {
                _repositoryContext.Add(visitant);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/api/visitant/{visitant.Id}", visitant);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{visitantId}")]
        public async Task<IActionResult> Put(int visitantId, Visitant model)
        {
            try
            {
                //verifica se o registro existe para realizar atualização
                var visitant = await _repo.GetVisitantAsyncById(visitantId);
                if (visitant == null) return NotFound();

                _repositoryContext.Update(model);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/api/visitant/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{visitantId}")]
        public async Task<IActionResult> Delete(int visitantId)
        {
            try
            {
                var obj = await _repo.GetVisitantAsyncById(visitantId);
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