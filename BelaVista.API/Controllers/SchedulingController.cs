using System;
using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BelaVista.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchedulingController : ControllerBase
    {
        private readonly IScheduling _repo;
        private readonly IBelaVistaRepository _repositoryContext;

        public SchedulingController(IScheduling repo, IBelaVistaRepository repositoryContext)
        {
            _repo = repo;
            _repositoryContext = repositoryContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllScheduling();

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpGet("{schedulingId}")]
        public async Task<IActionResult> Get(int schedulingId)
        {
            try
            {
                var results = await _repo.GetScheduling(schedulingId);
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

        [HttpGet("getByDate/{startDate}/{endDate}")]
        public async Task<IActionResult> Get(DateTime startDate, DateTime endDate)
        {
            try
            {
                var results = await _repo.SearhSchedulingByDate(startDate, endDate);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> Post(Scheduling scheduling)
        {
            try
            {
                _repositoryContext.Add(scheduling);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/api/scheduling/{scheduling.Id}", scheduling);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{schedulingId}")]
        public async Task<IActionResult> Put(int schedulingId, Scheduling model)
        {
            try
            {
                //verifica se o registro existe para realizar atualização
                var scheduling = await _repo.GetScheduling(schedulingId);
                if (scheduling == null) return NotFound();

                _repositoryContext.Update(model);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/api/scheduling/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{schedulingId}")]
        public async Task<IActionResult> Delete(int schedulingId)
        {
            try
            {
                var obj = await _repo.GetScheduling(schedulingId);
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