using BelaVista.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
namespace BelaVista.Repository
{
    public class BelaVistaContext : DbContext
    {
        public BelaVistaContext(DbContextOptions<BelaVistaContext> options) : base (options) {}
        public DbSet<Complaint> Complaint { get; set; }
        public DbSet<Condominium> Condominium { get; set; }
        public DbSet<Meeting> Meeting { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleCondominiun> RoleCondominiun { get; set; }
        public DbSet<ScheduleStatus> ScheduleStatus { get; set; }
        public DbSet<ScheduleType> ScheduleType { get; set; }
        public DbSet<Scheduling> Scheduling { get; set; }
        public DbSet<Visitant> Visitant { get; set; }
        public DbSet<Warning> Warning { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // cria tabela relacional entre usuário e condomino
            modelBuilder.Entity<RoleCondominiun>().HasKey(rc => new { rc.RoleId, rc.CondominiumId });
        }
    }
}
