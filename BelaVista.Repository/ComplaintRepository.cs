using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BelaVista.Repository
{
    public class ComplaintRepository : IComplaint
    {
        private readonly BelaVistaContext _context;
        public ComplaintRepository(BelaVistaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<List<Complaint>> GetAllComplaintsAsync()
        {
            IQueryable<Complaint> query = _context.Complaint
            .Include(c => c.Condominium);

            if (query.ToListAsync().Result != null && query.ToListAsync().Result.Count > 0)
            {
                query = query.OrderByDescending(c => c.CreateDate);

                return await query.ToListAsync();
            }
            return new List<Complaint>();
        }

        public async Task<Complaint> GetComplaintAsyncById(int id)
        {
            IQueryable<Complaint> query = _context.Complaint
            .Include(c => c.Condominium);

            if (query.ToListAsync().Result != null && query.ToListAsync().Result.Count > 0)
            {
                query = query.OrderByDescending(c => c.CreateDate).Where(c => c.Id == id);

                return await query.FirstOrDefaultAsync();
            }
            return null;
        }
    }
}