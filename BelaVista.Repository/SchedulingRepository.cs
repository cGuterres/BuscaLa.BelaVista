using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BelaVista.Entity;
using Microsoft.EntityFrameworkCore;

namespace BelaVista.Repository
{
    public class SchedulingRepository : IScheduling
    {
        private readonly BelaVistaContext _context;

        public SchedulingRepository(BelaVistaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; 
        }

        public async Task<List<Scheduling>> GetAllScheduling()
        {
            IQueryable<Scheduling> query = _context.Scheduling
            .Include(c => c.Condominium)
            .Include(type => type.ScheduleType)
            .Include(status => status.ScheduleStatus);

            if (query.ToListAsync().Result != null && query.ToListAsync().Result.Count > 0)
            {
                query = query.OrderByDescending(s => s.ScheduleDate);

                return await query.ToListAsync();
            }
            return null;
        }

        public async Task<Scheduling> GetScheduling(int id)
        {
             IQueryable<Scheduling> query = _context.Scheduling
            .Include(c => c.Condominium)
            .Include(type => type.ScheduleType)
            .Include(status => status.ScheduleStatus);

            query = query.OrderBy(c => c.ScheduleDate).Where(s => s.Id == id);
            if(query != null){
                return await query.FirstOrDefaultAsync();
            }
            return null;
        }

        public async Task<List<Scheduling>> SearhSchedulingByDate(DateTime startDate, DateTime endDate)
        {
             IQueryable<Scheduling> query = _context.Scheduling
            .Include(c => c.Condominium)
            .Include(type => type.ScheduleType)
            .Include(status => status.ScheduleStatus);

            query = query.OrderBy(c => c.ScheduleDate).Where(s => s.ScheduleDate >= startDate && 
                                                             s.ScheduleDate <= endDate);
            if(query != null){
                return await query.ToListAsync();
            }
            return null;
        }
    }
}