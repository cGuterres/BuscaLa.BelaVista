using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace BelaVista.Entity.Identity
{
    public class Role : IdentityRole<int>
    {
        public List<UserRole> UserRoles { get; set; }
    }
}