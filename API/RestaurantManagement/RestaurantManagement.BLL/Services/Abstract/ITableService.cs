﻿using RestaurantManagement.BLL.DTOs.Order;
using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface ITableService
    {
        Task<PageResultDto<TableDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<TableDto> GetByIdAsync(int id);
        Task<TableDto> CreateTableAsync(TablePostDto tablePostDto);
        Task UpdateTableAsync(int id, TablePutDto tablePutDto);
        Task DeleteTableAsync(int id);
    }
}
