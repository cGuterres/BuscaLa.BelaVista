using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BelaVista.Entity;
using BelaVista.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BelaVista.Repository
{
    public class MeetingRepository : IMeeting
    {
        private readonly BelaVistaContext _context;
        public MeetingRepository(BelaVistaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<List<Meeting>> GetAllMeetingsAsync()
        {
            IQueryable<Meeting> query = _context.Meeting;
            if(query != null) 
            {
                return await query.ToListAsync();
            }
            return null;
        }

        public Task<Meeting> GetMeetingAsyncById(int id)
        {
            IQueryable<Meeting> query = _context.Meeting;
            if(query != null) 
            {
                query = query.Where(m => m.Id == id);
                if(query != null)
                {
                    return query.FirstOrDefaultAsync();
                }
            }
            return null;
        }
    }
}