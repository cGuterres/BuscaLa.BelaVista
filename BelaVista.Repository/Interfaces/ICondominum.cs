using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository
{
    public interface ICondominum
    {
         Task<List<Condominium>> GetAllCondominiunsAsync();
         Task<Condominium> GetCondominiumAsyncById(int id);
         Task<List<Condominium>> GetCondominiumByNameAsync(string name);
         Task<Condominium> GetCondominiumByEmailAsync(string email);
    }
}