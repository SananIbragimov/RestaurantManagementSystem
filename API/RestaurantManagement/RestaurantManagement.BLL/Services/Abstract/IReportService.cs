using RestaurantManagement.BLL.DTOs.Order;
using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IReportService
    {
        Task<PageResultDto<ReportDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<ReportDto> GetByIdAsync(int id);
        Task<Decimal> CalculateTotalSalesAsync(DateTime startDate, DateTime endDate);
        Task<ReportDto> CreateReportAsync(ReportPostDto reportPostDto);
        Task UpdateReportAsync(int id, ReportPutDto reportPutDto);
        Task DeleteReportAsync(int id);
    }
}
