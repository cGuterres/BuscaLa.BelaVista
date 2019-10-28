using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;

namespace BelaVista.Repository
{
    public interface IScheduling
    {
         Task<List<Scheduling>> GetAllScheduling();
         Task<List<Scheduling>> SearhSchedulingByDate(DateTime startDate, DateTime endDate);
         Task<Scheduling> GetScheduling(int id);
    }
}