using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository
{
    public interface IScheduling
    {
         Task<List<Scheduling>> GetAllScheduling();
         Task<Scheduling> SearhSchedulingByDate(string scheduleDate);
         Task<Scheduling> GetScheduling(int id);
    }
}