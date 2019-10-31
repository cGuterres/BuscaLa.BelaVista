using System;
using System.Collections.Generic;

namespace BelaVista.Entity
{
    public class Condominium
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public string Rg { get; set; }
        public string Phone { get; set; }
        public string ContactPhone { get; set; }
        public bool Active { get; set; }
        public string Password { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public IList<Visitant> Visitants { get; set; }
        public string Ap { get; set; }

        public Condominium()
        {
            this.CreateDate = DateTime.Now;
            this.Active = true;
        }
    }
}