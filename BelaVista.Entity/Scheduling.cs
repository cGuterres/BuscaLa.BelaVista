using System;

namespace BelaVista.Entity
{
    public class Scheduling
    {
        public int Id { get; set; }
        public int ScheduleTypeId { get; set; }
        public ScheduleType ScheduleType { get; }
        public int CondominiumId { get; set; }
        public Condominium Condominium { get; }
        public int ScheduleStatusId { get; set; }
        public ScheduleStatus ScheduleStatus { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ScheduleDate { get; set; }
        public string Description { get; set; }

        public Scheduling()
        {
            this.CreateDate = DateTime.Now;
        }
    }
}