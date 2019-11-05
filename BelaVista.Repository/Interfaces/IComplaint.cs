using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository.Interfaces
{
    public interface IComplaint 
    {
        Task<List<Complaint>> GetAllComplaintsAsync();
        Task<Complaint> GetComplaintAsyncById(int id);
    }
}