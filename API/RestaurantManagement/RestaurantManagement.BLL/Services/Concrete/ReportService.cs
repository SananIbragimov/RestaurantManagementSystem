using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Order;
using RestaurantManagement.BLL.DTOs.Report;
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
    public class ReportService : IReportService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ReportService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<ReportDto>> GetAllAsync()
        {
            var reports = await _dbContext.Reports.AsNoTracking().ToListAsync();

            var reportDtos = _mapper.Map<List<ReportDto>>(reports);

            return reportDtos;
        }

        public async Task<ReportDto> GetByIdAsync(int id)
        {
            var report = await _dbContext.Reports.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
            var reportDto = _mapper.Map<ReportDto>(report);

            return reportDto;
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
