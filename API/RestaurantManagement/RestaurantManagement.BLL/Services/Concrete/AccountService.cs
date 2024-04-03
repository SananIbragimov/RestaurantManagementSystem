using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RestaurantManagement.BLL.DTOs.Account;
using RestaurantManagement.BLL.Enums;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Concrete
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AccountService(UserManager<AppUser> userManager,
                              SignInManager<AppUser> signInManager,
                              IConfiguration configuration,
                              IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
        }
        public async Task<(string UserName, string Token, string Role)> LoginUserAsync(LoginDto loginDto)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);
            if (!result.Succeeded)
            {
                return (null!, null!, null!);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles);
            var role = roles.FirstOrDefault();

            return (user.FirstName, token, role!);
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDto registerDto)
        {
            var user = _mapper.Map<AppUser>(registerDto);
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                if (registerDto.Role.Equals("SuperAdmin", StringComparison.OrdinalIgnoreCase))
                {
                    return IdentityResult.Failed(new IdentityError { Description = "Creating SuperAdmin role is not allowed." });
                }

                var roleResult = await _userManager.AddToRoleAsync(user, registerDto.Role);
                if (!roleResult.Succeeded)
                {
                    return IdentityResult.Failed(roleResult.Errors.ToArray());
                }
            }

            return result;
        }

        private string GenerateJwtToken(AppUser user, IList<string> roles)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));

            var claims = new List<Claim>
    {
        new Claim("UserName", user.UserName),
    };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:ValidIssuer"],
                audience: _configuration["Jwt:ValidAudience"],
                expires: DateTime.Now.AddMinutes(30),
                claims: claims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
