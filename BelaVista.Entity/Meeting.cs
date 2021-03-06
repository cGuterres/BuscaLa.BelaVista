using System;

namespace BelaVista.Entity
{
    public class Meeting
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public byte[] DocAta { get; set; }
        public bool IsCancel { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime ScheduleDate { get; set; }

        public Meeting()
        {
            this.CreateDate = DateTime.Now;
            this.UpdateDate = DateTime.Now;
        }
    }
}