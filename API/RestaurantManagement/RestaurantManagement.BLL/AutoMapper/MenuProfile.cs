using AutoMapper;
using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    public class MenuProfile : Profile
    {
        public MenuProfile()
        {
            CreateMap<Menu, MenuDto>();
            CreateMap<MenuPostDto, Menu>();
            CreateMap<MenuPutDto, Menu>();
            CreateMap<MenuItem, MenuItemDto>();
            CreateMap<MenuItemPostDto, MenuItem>();
            CreateMap<MenuItemPutDto, MenuItem>();
        }
    }
}
