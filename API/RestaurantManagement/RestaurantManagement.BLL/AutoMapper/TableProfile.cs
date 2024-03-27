using AutoMapper;
using RestaurantManagement.BLL.DTOs.Table;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.AutoMapper
{
    public class TableProfile : Profile
    {
        public TableProfile()
        {
            CreateMap<Table, TableDto>();
            CreateMap<TablePostDto, Table>();
            CreateMap<TablePutDto, Table>();
            CreateMap<TableOpeningHistory, TableOpeningHistoryDto>();
            CreateMap<TableOpeningHistoryPostDto, TableOpeningHistory>();
            CreateMap<TableOpeningHistoryPutDto, TableOpeningHistory>();
        }
    }
}
