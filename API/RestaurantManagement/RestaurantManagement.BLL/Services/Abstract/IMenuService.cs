using RestaurantManagement.BLL.DTOs.Menu;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IMenuService
    {
        Task<List<MenuDto>> GetAllAsync();
        Task<MenuDto> GetByIdAsync(int id);
        Task<MenuDto> CreateMenuAsync(MenuPostDto menuPostDto);
        Task UpdateMenuAsync(int id, MenuPutDto menuPutDto);
        Task DeleteMenuAsync(int id);
    }
}
