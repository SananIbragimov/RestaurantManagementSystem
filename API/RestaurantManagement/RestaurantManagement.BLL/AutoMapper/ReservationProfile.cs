using AutoMapper;
using RestaurantManagement.BLL.DTOs.Reservation;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<Reservation, ReservationDto>();
            CreateMap<ReservationPostDto, Reservation>();
            CreateMap<ReservationPutDto, Reservation>();
        }
    }
}
