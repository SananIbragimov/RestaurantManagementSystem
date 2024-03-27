using RestaurantManagement.BLL.DTOs.Order;
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
        Task<List<ReportDto>> GetAllAsync();
        Task<ReportDto> GetByIdAsync(int id);
        Task<ReportDto> CreateReportAsync(ReportPostDto reportPostDto);
        Task UpdateReportAsync(int id, ReportPutDto reportPutDto);
        Task DeleteReportAsync(int id);
    }
}
