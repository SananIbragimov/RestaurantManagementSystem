using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
    public class TableOpeningHistoryService : ITableOpeningHistoryService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public TableOpeningHistoryService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<TableOpeningHistoryDto>> GetAllAsync()
        {
            var tableOpeningHistorys = await _dbContext.TableOpeningHistories.AsNoTracking().ToListAsync();

            var tableOpeningHistoryDtos = _mapper.Map<List<TableOpeningHistoryDto>>(tableOpeningHistorys);

            return tableOpeningHistoryDtos;
        }

        public async Task<TableOpeningHistoryDto> GetByIdAsync(int id)
        {
            var tableOpeningHistory = await _dbContext.TableOpeningHistories.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
            var tableOpeningHistoryDto = _mapper.Map<TableOpeningHistoryDto>(tableOpeningHistory);

            return tableOpeningHistoryDto;
        }

        public async Task<TableOpeningHistoryDto> CreateTableOpeningHistoryAsync(TableOpeningHistoryPostDto tableOpeningHistoryPostDto)
        {
            var tableOpeningHistory = _mapper.Map<TableOpeningHistory>(tableOpeningHistoryPostDto);

            _dbContext.TableOpeningHistories.Add(tableOpeningHistory);
            await _dbContext.SaveChangesAsync();

            var tableOpeningHistoryDto = _mapper.Map<TableOpeningHistoryDto>(tableOpeningHistory);

            return tableOpeningHistoryDto;
        }

        public async Task UpdateTableOpeningHistoryAsync(int id, TableOpeningHistoryPutDto tableOpeningHistoryPutDto)
        {
            var tableOpeningHistory = await _dbContext.TableOpeningHistories.FirstOrDefaultAsync(r => r.Id == id);
            if (tableOpeningHistory != null)
            {
                _mapper.Map(tableOpeningHistoryPutDto, tableOpeningHistory);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"TableOpeningHistory with Id {id} not found");
            }
        }

        public async Task DeleteTableOpeningHistoryAsync(int id)
        {
            var tableOpeningHistory = await _dbContext.TableOpeningHistories.FirstOrDefaultAsync(r => r.Id == id);
            if (tableOpeningHistory != null)
            {
                _dbContext.TableOpeningHistories.Remove(tableOpeningHistory);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"TableOpeningHistory with Id {id} not found");
            }
        }
    }
}
