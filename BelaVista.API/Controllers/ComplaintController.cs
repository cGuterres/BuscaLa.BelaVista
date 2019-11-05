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
    public class ComplaintController : ControllerBase
    {
        private readonly IComplaint _repo;
        private readonly IBelaVistaRepository _repositoryContext;
        public ComplaintController(IComplaint repo, IBelaVistaRepository repositoryContext)
        {
            _repo = repo;
            _repositoryContext = repositoryContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllComplaintsAsync();

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
        }

        [HttpGet("{complaintId}")]
        public async Task<IActionResult> Get(int complaintId)
        {
            try
            {
                var results = await _repo.GetComplaintAsyncById(complaintId);
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
        public async Task<IActionResult> Post(Complaint complaint)
        {
            try
            {
                _repositoryContext.Add(complaint);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/site/complaint/{complaint.Id}", complaint);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{complaintId}")]
        public async Task<IActionResult> Put(int complaintId, Complaint model)
        {
            try
            {
                //verifica se o registro existe para realizar atualização
                var complaint = await _repo.GetComplaintAsyncById(complaintId);
                if (complaint == null) return NotFound();

                _repositoryContext.Update(model);
                if (await _repositoryContext.SaveChanges())
                {
                    return Created($"/site/complaint/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco de dados sem acesso. {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{complaintId}")]
        public async Task<IActionResult> Delete(int complaintId)
        {
            try
            {
                var obj = await _repo.GetComplaintAsyncById(complaintId);
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