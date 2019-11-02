using Microsoft.AspNetCore.Identity;

namespace BelaVista.Entity.Identity
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}