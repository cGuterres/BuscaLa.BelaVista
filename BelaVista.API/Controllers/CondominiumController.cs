using System.Threading.Tasks;
using BelaVista.Entity;
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
        private readonly IBelaVistaRepository _repositoryContext;
        public CondominiumController(ICondominum repo, IBelaVistaRepository repositoryContext)
        {
            _repo = repo;
            _repositoryContext = repositoryContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllCondominiunsAsync();

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpGet("{condominiumId}")]
        public async Task<IActionResult> Get(int condominiumId)
        {
            try
            {
                var results = await _repo.GetCondominiumAsyncById(condominiumId);
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
                var results = await _repo.GetCondominiumByNameAsync(name);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> Post(Condominium condominium)
        {
            try
            {
                _repositoryContext.Add(condominium);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/site/condominium/{condominium.Id}", condominium);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{condominiumId}")]
        public async Task<IActionResult> Put(int condominiumId, Condominium model)
        {
            try
            {
                //verifica se o registro existe para realizar atualização
                var condominium = await _repo.GetCondominiumAsyncById(condominiumId);
                if (condominium == null) return NotFound();

                _repositoryContext.Update(model);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/site/condominium/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{condominiumId}")]
        public async Task<IActionResult> Delete(int condominiumId)
        {
            try
            {
                var obj = await _repo.GetCondominiumAsyncById(condominiumId);
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