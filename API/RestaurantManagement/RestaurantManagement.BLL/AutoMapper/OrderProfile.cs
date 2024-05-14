using AutoMapper;
using RestaurantManagement.BLL.DTOs.Order;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems)); ;
            CreateMap<OrderPostDto, Order>();
            CreateMap<OrderPutDto, Order>();
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product))
                .ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order)); ;
            CreateMap<OrderItemPostDto, OrderItem>();
            CreateMap<OrderItemPutDto, OrderItem>();
        }
    }
}
