using Microsoft.AspNetCore.Identity;
using RestaurantManagement.BLL.Enums;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.concrete
{
    public class ApplicationDbInitializer
    {
        public static async Task SeedData(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            await SeedRoles(roleManager);
            await SeedSuperAdmin(userManager);
        }

        private static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            foreach (var role in Enum.GetNames(typeof(Roles)))
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        private static async Task SeedSuperAdmin(UserManager<AppUser> userManager)
        {
            var superAdminUser = new AppUser
            {
                FirstName = "Ali",
                LastName = "Aliyev",
                UserName = "superadmin@gmail.com",
                Email = "superadmin@gmail.com",
                PhoneNumber = "050-222-22-22"
            };

            var userExists = await userManager.FindByEmailAsync(superAdminUser.Email);
            if (userExists == null)
            {
                await userManager.CreateAsync(superAdminUser, "SuperAdmin12345!");
                await userManager.AddToRoleAsync(superAdminUser, Roles.SuperAdmin.ToString());
            }
        }
    }

}
