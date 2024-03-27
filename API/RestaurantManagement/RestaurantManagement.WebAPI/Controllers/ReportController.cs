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
        public async Task<IActionResult> GetAll()
        {
            var reports = await _reportService.GetAllAsync();
            return Ok(reports);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var report = await _reportService.GetByIdAsync(id);
            if (report == null) return NotFound("Report not found");

            return Ok(report);
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
                return NoContent();
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
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
