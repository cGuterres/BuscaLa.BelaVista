using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BelaVista.Repository
{
    public class WarningRepository : IWarning
    {
        private readonly BelaVistaContext _context;
        public WarningRepository(BelaVistaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<List<Warning>> GetAllWarningsAsync()
        {
            IQueryable<Warning> query = _context.Warning
            .Include(x => x.Condominium);

            if (query.ToListAsync().Result != null && query.ToListAsync().Result.Count > 0)
            {
                query = query.OrderByDescending(c => c.CreateDate);

                return await query.ToListAsync();
            }
            return new List<Warning>();
        }

        public async Task<Warning> GetWarningAsyncById(int id)
        {
            IQueryable<Warning> query = _context.Warning;

            if (query.ToListAsync().Result != null && query.ToListAsync().Result.Count > 0)
            {
                query = query.OrderByDescending(c => c.CreateDate).Where(c => c.Id == id);

                return await query.FirstOrDefaultAsync();
            }
            return null;
        }
    }
}