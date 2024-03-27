using AutoMapper;
using RestaurantManagement.BLL.DTOs.Setting;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    public class SettingProfile : Profile
    {
        public SettingProfile()
        {
            CreateMap<Setting, SettingDto>();
            CreateMap<SettingPostDto, Setting>();
            CreateMap<SettingPutDto, Setting>();
        }
    }
}
