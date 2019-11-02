using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace BelaVista.Entity.Identity
{
    public class User : IdentityUser<int>
    {
        [Column(TypeName="nvarchar(150)")]
        public string FullName { get; set; }

        [Column(TypeName="nvarchar(50)")]
        public string Password { get; set; }

        public List<UserRole> UserRoles { get; set; }
    }
}