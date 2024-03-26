using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.Services.Abstract;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var menus =await _menuService.GetAllAsync();
            return Ok(menus);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var menu = await _menuService.GetByIdAsync(id);
            if (menu == null) return NotFound("Menu not found");

            return Ok(menu);
        }

        [HttpPost]
        public async Task<IActionResult> Create(MenuPostDto menuPostDto)
        {
            var menu = await _menuService.CreateMenuAsync(menuPostDto);

            return CreatedAtAction(nameof(GetById), new { id = menu.Id }, menu);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MenuPutDto menuPutDto)
        {
            try
            {
               await _menuService.UpdateMenuAsync(id, menuPutDto);
                return NoContent();
            }catch(KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _menuService.DeleteMenuAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
