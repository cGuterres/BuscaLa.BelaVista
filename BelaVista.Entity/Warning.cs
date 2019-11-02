using System;

namespace BelaVista.Entity
{
    public class Warning
    {
        public int Id { get; set; }
        public int CondominiumId { get; set; }
        public Condominium Condominium { get; }
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