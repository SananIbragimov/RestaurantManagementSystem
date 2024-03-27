using RestaurantManagement.BLL.DTOs.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface ITableOpeningHistoryService
    {
        Task<List<TableOpeningHistoryDto>> GetAllAsync();
        Task<TableOpeningHistoryDto> GetByIdAsync(int id);
        Task<TableOpeningHistoryDto> CreateTableOpeningHistoryAsync(TableOpeningHistoryPostDto tableOpeningHistoryPostDto);
        Task UpdateTableOpeningHistoryAsync(int id, TableOpeningHistoryPutDto tableOpeningHistoryPutDto);
        Task DeleteTableOpeningHistoryAsync(int id);
    }
}
