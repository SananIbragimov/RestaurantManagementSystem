
using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.DTOs.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IMenuService
    {
        Task<PageResultDto<MenuDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<MenuDto> GetByIdAsync(int id);
        Task<MenuDto> CreateMenuAsync(MenuPostDto menuPostDto);
        Task UpdateMenuAsync(int id, MenuPutDto menuPutDto);
        Task DeleteMenuAsync(int id);
    }
}
