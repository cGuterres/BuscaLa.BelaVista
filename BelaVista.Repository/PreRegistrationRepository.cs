using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BelaVista.Repository
{
    public class PreRegistrationRepository : IPreRegistration
    {
        private readonly BelaVistaContext _context; 
        public PreRegistrationRepository(BelaVistaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<PreRegistration> GetPreRegistration(string cpf, string ap)
        {
            IQueryable<PreRegistration> query = _context.PreRegistration;
            if(query != null){
                query = query.Where(r => r.Cpf.Equals(cpf) && r.Ap.Equals(ap));
            }
            return await query.FirstOrDefaultAsync();
        }
    }
}