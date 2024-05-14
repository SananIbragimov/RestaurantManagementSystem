using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Order;
using RestaurantManagement.BLL.DTOs.Report;
using RestaurantManagement.BLL.Services.Abstract;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int pageNumber = 1, int pageSize = 10)
        {
            var reports = await _reportService.GetAllAsync(pageNumber, pageSize);
            return Ok(reports);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var report = await _reportService.GetByIdAsync(id);
            if (report == null) return NotFound("Report not found");

            return Ok(report);
        }

        [HttpGet("totalsales")]
        public async Task<IActionResult> GetTotalSales([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var totalSales = await _reportService.CalculateTotalSalesAsync(startDate, endDate);
            return Ok(new { TotalSales = totalSales });
        }


        [HttpPost]
        public async Task<IActionResult> Create(ReportPostDto reportPostDto)
        {
            var report = await _reportService.CreateReportAsync(reportPostDto);

            return CreatedAtAction(nameof(GetById), new { id = report.Id }, report);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ReportPutDto reportPutDto)
        {
            try
            {
                await _reportService.UpdateReportAsync(id, reportPutDto);
                return Ok("Updated successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _reportService.DeleteReportAsync(id);
                return Ok("Deleted successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
