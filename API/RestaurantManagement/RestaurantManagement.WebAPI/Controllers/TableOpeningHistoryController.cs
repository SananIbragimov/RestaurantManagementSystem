using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Table;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.BLL.Services.Concrete;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableOpeningHistoryController : ControllerBase
    {
        private readonly ITableOpeningHistoryService _tableOpeningHistoryService;

        public TableOpeningHistoryController(ITableOpeningHistoryService tableOpeningHistoryService)
        {
            _tableOpeningHistoryService = tableOpeningHistoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tableOpeningHistories = await _tableOpeningHistoryService.GetAllAsync();
            return Ok(tableOpeningHistories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tableOpeningHistory = await _tableOpeningHistoryService.GetByIdAsync(id);
            if (tableOpeningHistory == null) return NotFound("TableOpeningHistory not found");

            return Ok(tableOpeningHistory);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TableOpeningHistoryPostDto tableOpeningHistoryPostDto)
        {
            var tableOpeningHistory = await _tableOpeningHistoryService.CreateTableOpeningHistoryAsync(tableOpeningHistoryPostDto);

            return CreatedAtAction(nameof(GetById), new { id = tableOpeningHistory.Id }, tableOpeningHistory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TableOpeningHistoryPutDto tableOpeningHistoryPutDto)
        {
            try
            {
                await _tableOpeningHistoryService.UpdateTableOpeningHistoryAsync(id, tableOpeningHistoryPutDto);
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
                await _tableOpeningHistoryService.DeleteTableOpeningHistoryAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
