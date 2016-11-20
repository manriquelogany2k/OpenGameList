using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OpenGameListWebApp.Data.Comments;
using OpenGameListWebApp.Data.Items;

namespace OpenGameListWebApp.Data.Users
{
    public class ApplicationUser : IdentityUser
    {


        public string DisplayName { get; set; }
        public string Notes { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

        public virtual List<Item> Items { get; set; }
        public virtual List<Comment> Comments { get; set; }

    }
}
