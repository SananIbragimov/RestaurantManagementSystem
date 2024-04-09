using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Account;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.BLL.Services.Concrete;
using RestaurantManagement.DAL.Entities;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IFileService _fileService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IFileService fileService, UserManager<AppUser> userManager, IMapper mapper)
        {
            _accountService = accountService;
            _fileService = fileService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {
            var result = await _accountService.RegisterUserAsync(registerDto);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var user = await _userManager.FindByEmailAsync(registerDto.Email);
            if (user == null)
            {
                return NotFound("User not found after registration.");
            }


            return Ok(new { Message = "User registered successfully", user.Id, user.UserName });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userInfo = await _accountService.LoginUserAsync(loginDto);
            if (userInfo == null)
            {
                return BadRequest("Invalid login attempt.");
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.Now.AddMinutes(30)
            };
            Response.Cookies.Append("AuthToken", userInfo.Token, cookieOptions);

            return Ok(userInfo);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(-1)
            };
            Response.Cookies.Append("AuthToken", "", cookieOptions);

            return Ok("Logged out");
        }


    }
}
