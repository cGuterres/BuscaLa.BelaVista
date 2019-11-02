using BelaVista.Entity;
using BelaVista.Entity.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace BelaVista.Repository
{
    public class BelaVistaContext : IdentityDbContext<User, Role, int,
                                                    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                                    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public BelaVistaContext(DbContextOptions<BelaVistaContext> options) : base (options) {}
        public DbSet<Complaint> Complaint { get; set; }
        public DbSet<Condominium> Condominium { get; set; }
        public DbSet<Meeting> Meeting { get; set; }
        public DbSet<ScheduleStatus> ScheduleStatus { get; set; }
        public DbSet<ScheduleType> ScheduleType { get; set; }
        public DbSet<Scheduling> Scheduling { get; set; }
        public DbSet<Visitant> Visitant { get; set; }
        public DbSet<Warning> Warning { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
                {
                    userRole.HasKey(ur => new { ur.UserId, ur.RoleId });
                    userRole.HasOne(ur => ur.Role)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

                    userRole.HasKey(ur => new { ur.UserId, ur.RoleId });
                    userRole.HasOne(ur => ur.User)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();   

                }
            );
        }
    }
}
