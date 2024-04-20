using RestaurantManagement.BLL.DTOs.Menu;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IMenuItemService
    {
        Task<List<MenuItemDto>> GetAllAsync();
        Task<MenuItemDto> GetByIdAsync(int id);
        Task<List<MenuItemDto>> GetAllMenuItemsByMenuIdAsync(int menuId);
        Task<MenuItemDto> CreateMenuItemAsync(MenuItemPostDto menuItemPostDto);
        Task UpdateMenuItemAsync(int id, MenuItemPutDto menuItemPutDto);
        Task DeleteMenuItemAsync(int id);
    }
}
