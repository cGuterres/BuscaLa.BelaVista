using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository.Interfaces
{
    public interface IVisitant
    {
         Task<List<Visitant>> GetAllVisitantsAsync();
         Task<Visitant> GetVisitantAsyncById(int id);
         Task<List<Visitant>> GetVisitantByNameAsync(string name);
    }
}