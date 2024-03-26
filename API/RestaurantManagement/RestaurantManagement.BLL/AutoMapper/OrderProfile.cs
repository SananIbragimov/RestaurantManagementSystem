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
            CreateMap<Order, OrderDto>();
            CreateMap<OrderPostDto, Order>();
            CreateMap<OrderPutDto, Order>();
            CreateMap<OrderItem, OrderItemDto>();
            CreateMap<OrderItemPostDto, OrderItem>();
            CreateMap<OrderItemPutDto, OrderItem>();
        }
    }
}
