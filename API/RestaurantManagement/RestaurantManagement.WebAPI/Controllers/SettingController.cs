using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Setting;
using RestaurantManagement.BLL.Services.Abstract;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private readonly ISettingService _settingService;

        public SettingController(ISettingService settingService)
        {
            _settingService = settingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var settings = await _settingService.GetAllAsync();
            return Ok(settings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var setting = await _settingService.GetByIdAsync(id);
            if (setting == null) return NotFound("Setting not found");

            return Ok(setting);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SettingPostDto settingPostDto)
        {
            var setting = await _settingService.CreateSettingAsync(settingPostDto);

            return CreatedAtAction(nameof(GetById), new { id = setting.Id }, setting);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SettingPutDto settingPutDto)
        {
            try
            {
                await _settingService.UpdateSettingAsync(id, settingPutDto);
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
                await _settingService.DeleteSettingAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
