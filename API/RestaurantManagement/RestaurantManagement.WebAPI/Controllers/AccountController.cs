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
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {
            string imageUrl = null;
            if (registerDto.Image != null)
            {
                imageUrl = await _fileService.AddFileAsync(registerDto.Image, "userImages");
                if (string.IsNullOrEmpty(imageUrl))
                {
                    return BadRequest("An error occurred while uploading the file.");
                }
            }

            var user = _mapper.Map<AppUser>(registerDto);

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                if (!string.IsNullOrEmpty(imageUrl))
                {
                    _fileService.DeleteFile(Path.GetFileName(imageUrl), "userImages");
                }
                return BadRequest(result.Errors);
            }

            var roleResult = await _userManager.AddToRoleAsync(user, registerDto.Role);
            if (!roleResult.Succeeded)
            {
                return BadRequest(roleResult.Errors);
            }

            return Ok(new { Message = "User registered successfully", user.Id, user.UserName, user.Email, user.ImageUrl });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var token = await _accountService.LoginUserAsync(loginDto);
            if (token == null)
            {
                return BadRequest("Invalid login attempt.");
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.Now.AddMinutes(30)
            };
            Response.Cookies.Append("AuthToken", token, cookieOptions);

            return Ok(new { Token = token });
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
