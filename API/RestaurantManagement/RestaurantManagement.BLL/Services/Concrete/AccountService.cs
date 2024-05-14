using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using RestaurantManagement.BLL.DTOs.Account;
using RestaurantManagement.BLL.DTOs.Product;
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
        private readonly IFileService _fileService;
        private readonly ILogger<AccountService> _logger;

        public AccountService(UserManager<AppUser> userManager,
                              SignInManager<AppUser> signInManager,
                              IConfiguration configuration,
                              IMapper mapper,
                              IFileService fileService,
                              ILogger<AccountService> logger)

        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
            _fileService = fileService;
            _logger = logger;
        }
        public async Task<UserInfoDto> LoginUserAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                _logger.LogWarning("User not found: {Email}", loginDto.Email);
                return null;
            }

            var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);
            if (!result.Succeeded)
            {
                _logger.LogWarning("Invalid login. Email: {Email}, Result: {@Result}", loginDto.Email, result);
                return null;
            }

            user = await _userManager.FindByEmailAsync(loginDto.Email);
            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles);
            var role = roles.FirstOrDefault();

            return new UserInfoDto
            {
                UserName = user.FirstName,
                Token = token,
                Role = role,
                ImageUrl = user.ImageUrl
            };
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDto registerDto)
        {
            var imageUrl = "";
            if (registerDto.Image != null)
            {
                imageUrl = await _fileService.AddFileAsync(registerDto.Image, "uploads/users");
            }
            var user = _mapper.Map<AppUser>(registerDto);
            user.ImageUrl = imageUrl;
            user.UserName = registerDto.Email;
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
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
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
