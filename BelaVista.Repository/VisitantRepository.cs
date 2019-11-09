using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BelaVista.Repository
{
    public class VisitantRepository : IVisitant
    {
        private readonly BelaVistaContext _context;
        public VisitantRepository(BelaVistaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<List<Visitant>> GetAllVisitantsAsync()
        {
            IQueryable<Visitant> query = _context.Visitant
            .Include(x => x.Condominium);

            if (query.ToListAsync().Result != null && query.ToListAsync().Result.Count > 0)
            {
                query = query.OrderByDescending(v => v.Name);

                return await query.ToListAsync();
            };
            
            query = query.OrderBy(c => c.Name);

            return await query.ToListAsync();
        }

        public async Task<Visitant> GetVisitantAsyncById(int id)
        {
            IQueryable<Visitant> query = _context.Visitant
            .Include(c => c.Condominium);

            if (query.ToListAsync().Result != null && query.ToListAsync().Result.Count > 0)
            {
                query = query.OrderByDescending(c => c.CreateDate).Where(c => c.Id == id);

                return await query.FirstOrDefaultAsync();
            }
            return null;
        }

        public async Task<List<Visitant>> GetVisitantByNameAsync(string name)
        {
            IQueryable<Visitant> query = _context.Visitant
            .Include(c => c.Condominium);

            query = query.OrderBy(c => c.Name).Where(c => c.Name.ToLower().Contains(name.ToLower()));

            return await query.ToListAsync();
        }
    }
}