using AutoMapper;
using RestaurantManagement.BLL.DTOs.User;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AppUser, UserDto>();
            CreateMap<UserPutDto, AppUser>()
                .ForMember(dest => dest.ImageUrl, opt => opt.Ignore());
        }
    }
}
