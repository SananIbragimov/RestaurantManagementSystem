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
        Task<List<ProductDto>> GetAllAsync();
        Task<ProductDto> GetByIdAsync(int id);
        Task<ProductDto> GetByNameAsync(string name);
        Task<List<ProductDto>> GetByPriceRangeAsync(int min, int max);
        Task<ProductDto> CreateProductAsync(ProductPostDto productPostDto);
        Task UpdateProductAsync(int id, ProductPutDto productPutDto);
        Task DeleteProductAsync(int id);
    }
}
