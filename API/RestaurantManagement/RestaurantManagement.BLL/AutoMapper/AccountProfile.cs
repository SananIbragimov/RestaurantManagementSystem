using AutoMapper;
using RestaurantManagement.BLL.DTOs.Account;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    internal class AccountProfile : Profile
    {
        public AccountProfile()
        {
            CreateMap<RegisterDto, AppUser>();
        }
    }
}
