using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository.Interfaces
{
    public interface IPreRegistration
    {
         Task<PreRegistration> GetPreRegistration(string cpf, string ap);
    }
}