using System;

namespace BelaVista.Entity
{
    public class Visitant
    {
        public int Idd { get; set; }
        public int CondominiumId { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public string Phone { get; set; }
        public DateTime CreateDate { get; set; }

        public Visitant()
        {
            this.CreateDate = DateTime.Now;
        }
    }
}