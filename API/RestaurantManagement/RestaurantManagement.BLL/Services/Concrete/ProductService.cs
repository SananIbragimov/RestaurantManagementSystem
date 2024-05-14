using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Category;
using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Product;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.DAL.Data;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Concrete
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public ProductService(AppDbContext dbContext, IMapper mapper, IFileService fileService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<PageResultDto<ProductDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _dbContext.Products.CountAsync();
            var products = await _dbContext.Products
                                .Include(p => p.Category)
                                .Skip((pageNumber - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();
            var productDtos = _mapper.Map<List<ProductDto>>(products);

            return new PageResultDto<ProductDto>
            {
                Items = productDtos,
                TotalCount = totalCount
            };

        }

        public async Task<ProductDto> GetByIdAsync(int id)
        {
            var product = await _dbContext.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
            var productDto = _mapper.Map<ProductDto>(product);

            return productDto;
        }

        public async Task<ProductDto> GetByNameAsync(string name)
        {
            var product = await _dbContext.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Name.ToLower() == name.ToLower());
            var productDto = _mapper.Map<ProductDto>(product);

            return productDto;
        }

        public async Task<PageResultDto<ProductDto>> GetByPriceRangeAsync(int min, int max, int pageNumber, int pageSize)
        {
            var products = await _dbContext.Products
                                .Include(p => p.Category)
                                .Where(p => p.Price >= min && p.Price <= max)
                                .Skip((pageNumber - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();

            var totalCount = products.Count();
            var productDtos = _mapper.Map<List<ProductDto>>(products);

            return new PageResultDto<ProductDto>
            {
                Items = productDtos,
                TotalCount = totalCount
            };
        }

        public async Task<ProductDto> CreateProductAsync(ProductPostDto productPostDto)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var imageUrl = await _fileService.AddFileAsync(productPostDto.Image, "uploads/products");
                    var productName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(productPostDto.Name.Trim());

                    var existingProduct = await _dbContext.Products
                                                            .FirstOrDefaultAsync(c => c.Name.ToUpper() == productName.ToUpper());

                    if (existingProduct != null)
                    {
                        throw new InvalidOperationException("A product with the same name already exists.");
                    }

                    var product = _mapper.Map<Product>(productPostDto);
                    product.ImageUrl = imageUrl;
                    product.Name = productName;

                    await _dbContext.Products.AddAsync(product);
                    await _dbContext.SaveChangesAsync();

                    await transaction.CommitAsync();

                    var savedProduct = await _dbContext.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == product.Id);
                    var productDto = _mapper.Map<ProductDto>(savedProduct);

                    return productDto;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    throw new Exception("Failed to create product: " + ex.Message);
                }
            }
        }


        public async Task<string> UpdateProductAsync(int id, ProductPutDto productPutDto)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product != null)
            {
                if (productPutDto.Image != null)
                {
                    var imageUrl = await _fileService.AddFileAsync(productPutDto.Image, "uploads/products");
                    product.ImageUrl = imageUrl;
                }

                _mapper.Map(productPutDto, product);
                await _dbContext.SaveChangesAsync();
                return product.ImageUrl;
            }
            else
            {
                throw new KeyNotFoundException($"Product with Id {id} not found.");
            }
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product not found with Id {id}");
            }

            if (!string.IsNullOrEmpty(product.ImageUrl))
            {
                var imagePath = Path.Combine("uploads", "products", Path.GetFileName(product.ImageUrl));
                _fileService.DeleteFile(Path.GetFileName(product.ImageUrl), Path.GetDirectoryName(imagePath));
            }

            _dbContext.Remove(product);
            await _dbContext.SaveChangesAsync();
        }

    }
}
