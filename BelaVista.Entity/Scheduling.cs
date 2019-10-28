using System;

namespace BelaVista.Entity
{
    public class Scheduling
    {
        public int Id { get; set; }
        public int ScheduleTypeId { get; set; }
        public int CondominiumId { get; set; }
        public int ScheduleStatusId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ScheduleDate { get; set; }
        public string Description { get; set; }

        public Scheduling()
        {
            this.CreateDate = DateTime.Now;
        }
    }
}