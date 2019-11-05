using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository.Interfaces
{
    public interface IWarning
    {
        Task<List<Warning>> GetAllWarningsAsync();
        Task<Warning> GetWarningAsyncById(int id);
    }
}