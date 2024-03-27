using AutoMapper;
using RestaurantManagement.BLL.DTOs.Report;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    public class ReportProfile : Profile
    {
        public ReportProfile()
        {
            CreateMap<Report, ReportDto>();
            CreateMap<ReportPostDto, Report>();
            CreateMap<ReportPutDto, Report>();
        }
    }
}
