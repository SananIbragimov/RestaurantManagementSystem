using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IProductService
    {
        Task<PageResultDto<ProductDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<ProductDto> GetByIdAsync(int id);
        Task<ProductDto> GetByNameAsync(string name);
        Task<PageResultDto<ProductDto>> GetByPriceRangeAsync(int min, int max, int pageNumber, int pageSize);
        Task<ProductDto> CreateProductAsync(ProductPostDto productPostDto);
        Task UpdateProductAsync(int id, ProductPutDto productPutDto);
        Task DeleteProductAsync(int id);
    }
}
