using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.User;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsers();
        Task<UserDto> GetUserById(string id);
        Task DeleteUser(string id);
        Task UpdateUser(string id, UserPutDto userPutDto);
    }
}
