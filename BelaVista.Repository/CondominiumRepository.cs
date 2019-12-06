using System.Collections.Generic;
using System.Threading.Tasks;
using BelaVista.Entity;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BelaVista.Repository
{
    public class CondominiumRepository : ICondominum
    {
        private readonly BelaVistaContext _context;
        public CondominiumRepository(BelaVistaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<List<Condominium>> GetAllCondominiunsAsync()
        {
            IQueryable<Condominium> query = _context.Condominium;
            
            query = query.OrderBy(c => c.Name);

            return await query.ToListAsync();
        }

        public async Task<Condominium> GetCondominiumAsyncById(int id)
        {
            IQueryable<Condominium> query = _context.Condominium
            .Include(v => v.Visitants)
            .Include(w => w.Warnings);

            query = query.OrderBy(c => c.Name).Where(v => v.Id == id);
            if(query != null){
                return await query.FirstOrDefaultAsync();
            }
            return null;
        }

        public async Task<Condominium> GetCondominiumByEmailAsync(string email)
        {
            IQueryable<Condominium> query = _context.Condominium;

            query = query.Where(c => c.Email.ToLower().Contains(email.ToLower()));

            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Condominium>> GetCondominiumByNameAsync(string name)
        {
            IQueryable<Condominium> query = _context.Condominium
            .Include(v => v.Visitants)
            .Include(w => w.Warnings);

            query = query.OrderBy(c => c.Name).Where(c => c.Name.ToLower().Contains(name.ToLower()));

            return await query.ToListAsync();
        }
    }
}