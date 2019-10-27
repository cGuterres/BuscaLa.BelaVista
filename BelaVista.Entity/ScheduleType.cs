using System;

namespace BelaVista.Entity
{
    public class ScheduleType
    {
        public int Idd { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }

        public ScheduleType()
        {
            this.CreateDate = DateTime.Now;
        }
    }
}