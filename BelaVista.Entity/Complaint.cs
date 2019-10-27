using System;

namespace BelaVista.Entity
{
    public class Complaint
    {
        public int Idd { get; set; }
        public int CondominiumId { get; set; }
        public string Description { get; set; }
        public bool IsResolved { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime OccurrenceDate { get; set; }

        public Complaint()
        {
            this.CreateDate = DateTime.Now;
        }
    }
}