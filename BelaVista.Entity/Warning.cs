using System;

namespace BelaVista.Entity
{
    public class Warning
    {
        public int Idd { get; set; }
        public int CondominiumId { get; set; }
        public string Description { get; set; }
        public DateTime ScheduleDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public Warning()
        {
            this.CreateDate = DateTime.Now;
        }
    }
}