using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository.Interfaces
{
    public interface IMeeting
    {
        Task<List<Meeting>> GetAllMeetingsAsync();
         Task<Meeting> GetMeetingAsyncById(int id);
    }
}