using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Table;
using RestaurantManagement.BLL.Services.Abstract;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly ITableService _tableService;

        public TableController(ITableService tableService)
        {
            _tableService = tableService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tables = await _tableService.GetAllAsync();
            return Ok(tables);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var table = await _tableService.GetByIdAsync(id);
            if (table == null) return NotFound("Table not found");

            return Ok(table);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TablePostDto tablePostDto)
        {
            var table = await _tableService.CreateTableAsync(tablePostDto);

            return CreatedAtAction(nameof(GetById), new { id = table.Id }, table);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TablePutDto tablePutDto)
        {
            try
            {
                await _tableService.UpdateTableAsync(id, tablePutDto);
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
                await _tableService.DeleteTableAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
