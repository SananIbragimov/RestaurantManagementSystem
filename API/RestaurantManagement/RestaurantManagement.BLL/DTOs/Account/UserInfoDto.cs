using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Account
{
    public class UserInfoDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public string ImageUrl { get; set; }
    }
}
