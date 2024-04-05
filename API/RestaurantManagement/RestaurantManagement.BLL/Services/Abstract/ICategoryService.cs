using RestaurantManagement.BLL.DTOs.Category;
using RestaurantManagement.BLL.DTOs.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface ICategoryService
    {
        Task<PageResultDto<CategoryDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<CategoryDto> GetByIdAsync(int id);
        Task<CategoryDto> GetByNameAsync(string name);
        Task<CategoryDto> CreateCategoryAsync(CategoryPostDto categoryPostDto);
        Task UpdateCategoryAsync(int id, CategoryPutDto categoryPutDto);
        Task DeleteCategoryAsync(int id);
    }

}
