using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.Services.Abstract;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IMenuItemService _menuItemService;

        public MenuItemController(IMenuItemService menuItemService)
        {
            _menuItemService = menuItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var menuItems = await _menuItemService.GetAllAsync();
            return Ok(menuItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var menuItem = await _menuItemService.GetByIdAsync(id);
            if (menuItem == null) return NotFound("MenuItem not found");

            return Ok(menuItem);
        }

        [HttpGet("menuId/{menuId}")]
        public async Task<IActionResult> GetAllMenuItemsByMenuId(int menuId)
        {
            var menuItems = await _menuItemService.GetAllMenuItemsByMenuIdAsync(menuId);
            if (!menuItems.Any())
            {
                return NotFound($"No MenuItems found for menuId: {menuId}");
            }

            return Ok(menuItems);
        }

        [HttpPost]
        public async Task<IActionResult> Create(MenuItemPostDto menuItemPostDto)
        {
            try
            {
                var menuItem = await _menuItemService.CreateMenuItemAsync(menuItemPostDto);
                return CreatedAtAction(nameof(GetById), new { id = menuItem.Id }, menuItem);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MenuItemPutDto menuItemPutDto)
        {
            try
            {
                await _menuItemService.UpdateMenuItemAsync(id, menuItemPutDto);
                return Ok("Updated successfully");
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
                await _menuItemService.DeleteMenuItemAsync(id);
                return Ok("Deleted successfully");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
