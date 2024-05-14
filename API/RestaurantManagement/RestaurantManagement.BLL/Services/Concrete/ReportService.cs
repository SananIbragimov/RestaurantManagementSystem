using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RestaurantManagement.BLL.DTOs.Order;
using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Report;
using RestaurantManagement.BLL.DTOs.Table;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.Common.Enums;
using RestaurantManagement.DAL.Data;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Concrete
{
    public class ReportService : IReportService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ReportService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PageResultDto<ReportDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _dbContext.Reports.CountAsync();
            var reports = await _dbContext.Reports
                                        .Skip((pageNumber - 1) * pageSize)
                                        .Take(pageSize)
                                        .ToListAsync();

            var reportDtos = _mapper.Map<List<ReportDto>>(reports);

            return new PageResultDto<ReportDto>
            {
                Items = reportDtos,
                TotalCount = totalCount
            };
        }

        public async Task<ReportDto> GetByIdAsync(int id)
        {
            var report = await _dbContext.Reports.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
            var reportDto = _mapper.Map<ReportDto>(report);

            return reportDto;
        }

        public async Task<decimal> CalculateTotalSalesAsync(DateTime startDate, DateTime endDate)
        {
            var reports = await _dbContext.Reports
                .Where(r => r.CreatedDate >= startDate && r.CreatedDate <= endDate && r.ReportType == ReportTypeEnum.Sales)
                .ToListAsync();

            decimal totalSales = 0;
            foreach (var report in reports)
            {
                var data = JsonConvert.DeserializeObject<Dictionary<string, object>>(report.Data);
                totalSales += Convert.ToDecimal(data["total"]);
            }

            return totalSales;
        }


        public async Task<ReportDto> CreateReportAsync(ReportPostDto reportPostDto)
        {
            var report = _mapper.Map<Report>(reportPostDto);

            _dbContext.Reports.Add(report);
            await _dbContext.SaveChangesAsync();

            var reportDto = _mapper.Map<ReportDto>(report);

            return reportDto;
        }

        public async Task UpdateReportAsync(int id, ReportPutDto reportPutDto)
        {
            var report = await _dbContext.Reports.FirstOrDefaultAsync(r => r.Id == id);
            if (report != null)
            {
                _mapper.Map(reportPutDto, report);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Report with Id {id} not found");
            }
        }

        public async Task DeleteReportAsync(int id)
        {
            var report = await _dbContext.Reports.FirstOrDefaultAsync(r => r.Id == id);
            if (report != null)
            {
                _dbContext.Reports.Remove(report);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Report with Id {id} not found");
            }
        }
    }
}
