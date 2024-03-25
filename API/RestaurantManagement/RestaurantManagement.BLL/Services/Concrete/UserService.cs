using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.User;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Concrete
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public UserService(UserManager<AppUser> userManager, IMapper mapper, IFileService fileService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            var users = await _userManager.Users.AsNoTracking().ToListAsync();
            if (users is null)
            {
                return null!;
            }
            var userDtos = _mapper.Map<List<UserDto>>(users);

            foreach (var userDto in userDtos)
            {
                var user = await _userManager.FindByIdAsync(userDto.Id.ToString());
                var roles = await _userManager.GetRolesAsync(user);
                userDto.Role = roles.FirstOrDefault();
            }

            return userDtos;
        }

        public async Task<UserDto> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user is null)
            {
                return null!;
            }
            var userDto = _mapper.Map<UserDto>(user);

            var role = await _userManager.GetRolesAsync(user);
            userDto.Role = role.FirstOrDefault();

            return userDto;
        }

        public async Task UpdateUser(string id, UserPutDto userPutDto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user is null) throw new Exception("User not found!");

            if (userPutDto.Image != null)
            {
                if (!string.IsNullOrWhiteSpace(user.ImageUrl))
                {
                    _fileService.DeleteFile(Path.GetFileName(user.ImageUrl), "userImages");
                }

                var imageUrl = await _fileService.AddFileAsync(userPutDto.Image, "userImages");
                user.ImageUrl = imageUrl;
            }

            if (userPutDto.Role.Equals("SuperAdmin", StringComparison.OrdinalIgnoreCase))
            {
                throw new Exception("SuperAdmin role cannot be assigned through update.");
            }

            _mapper.Map(userPutDto, user);

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                throw new Exception("User update failed.");
            }

            if (!string.IsNullOrEmpty(userPutDto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var passwordResult = await _userManager.ResetPasswordAsync(user, token, userPutDto.Password);
                if (!passwordResult.Succeeded)
                {
                    throw new Exception("Password update failed.");
                }
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            var currentRole = currentRoles.FirstOrDefault();

            if (userPutDto.Role != currentRole)
            {
                if (!string.IsNullOrEmpty(currentRole))
                {
                    await _userManager.RemoveFromRoleAsync(user, currentRole);
                }

                if (!string.IsNullOrEmpty(userPutDto.Role))
                {
                    await _userManager.AddToRoleAsync(user, userPutDto.Role);
                }
            }
        }

        public async Task DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            else
            {
                await _userManager.DeleteAsync(user);
            }
        }
    }
}
