using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using RestaurantManagement.BLL.DTOs.Account;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterUserAsync(RegisterDto registerDto);
        Task<UserInfoDto> LoginUserAsync(LoginDto loginDto);
    }
}
