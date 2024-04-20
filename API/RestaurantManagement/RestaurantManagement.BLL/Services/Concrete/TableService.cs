using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Table;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.DAL.Data;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Concrete
{
    public class TableService : ITableService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public TableService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PageResultDto<TableDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _dbContext.Tables.CountAsync();
            var tables = await _dbContext.Tables.
                                    Include(o => o.Orders)
                                    .Skip((pageNumber - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToListAsync();

            var tableDtos = _mapper.Map<List<TableDto>>(tables);

            return new PageResultDto<TableDto>
            {
                Items = tableDtos,
                TotalCount = totalCount
            };
        }

        public async Task<TableDto> GetByIdAsync(int id)
        {
            var table = await _dbContext.Tables.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
            var tableDto = _mapper.Map<TableDto>(table);

            return tableDto;
        }

        public async Task<TableDto> CreateTableAsync(TablePostDto tablePostDto)
        {
            var table = _mapper.Map<Table>(tablePostDto);

            _dbContext.Tables.Add(table);
            await _dbContext.SaveChangesAsync();

            var tableDto = _mapper.Map<TableDto>(table);

            return tableDto;
        }

        public async Task UpdateTableAsync(int id, TablePutDto tablePutDto)
        {
            var table = await _dbContext.Tables.FirstOrDefaultAsync(r => r.Id == id);
            if (table != null)
            {
                _mapper.Map(tablePutDto, table);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Table with Id {id} not found");
            }
        }

        public async Task DeleteTableAsync(int id)
        {
            var table = await _dbContext.Tables.FirstOrDefaultAsync(r => r.Id == id);
            if (table != null)
            {
                _dbContext.Tables.Remove(table);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Table with Id {id} not found");
            }
        }
    }
}
