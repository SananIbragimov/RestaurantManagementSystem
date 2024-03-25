using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Product;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.DAL.Data;
using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
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

        public async Task<List<ProductDto>> GetAllAsync()
        {
            var products =await _dbContext.Products.Include(p=>p.Category).ToListAsync();
            var productDto = _mapper.Map<List<ProductDto>>(products);

            return productDto;

        }

        public async Task<ProductDto> GetByIdAsync(int id)
        {
            var product =await _dbContext.Products.Include(p=>p.Category).FirstOrDefaultAsync(p=>p.Id == id);
            var productDto = _mapper.Map<ProductDto>(product);

            return productDto;
        }

        public async Task<ProductDto> GetByNameAsync(string name)
        {
            var product =await  _dbContext.Products.Include(p => p.Category).FirstOrDefaultAsync(p=>p.Name.ToLower() == name.ToLower());
            var productDto = _mapper.Map<ProductDto>(product);

            return productDto;
        }

        public async Task<List<ProductDto>> GetByPriceRangeAsync(int min, int max)
        {
            var product = await _dbContext.Products.Include(p => p.Category).Where(p=>p.Price>=min && p.Price<=max).ToListAsync();
            var productDtos = _mapper.Map<List<ProductDto>>(product);

            return productDtos;
        }

        public async Task<ProductDto> CreateProductAsync(ProductPostDto productPostDto)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var imageUrl = await _fileService.AddFileAsync(productPostDto.Image, "uploads/products");

                    var product = _mapper.Map<Product>(productPostDto);

                    product.ImageUrl = imageUrl;

                    await _dbContext.Products.AddAsync(product);
                    await _dbContext.SaveChangesAsync();

                    await transaction.CommitAsync();

                    var savedProduct = await _dbContext.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == product.Id);

                    var productDto = _mapper.Map<ProductDto>(savedProduct);

                    return productDto;
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }

        }

        public async Task UpdateProductAsync(int id, ProductPutDto productPutDto)
        {
            var product =await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product != null)
            {
                _mapper.Map(productPutDto, product);

                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Product with Id {id} not found.");
            }
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product != null)
            {
                 _dbContext.Remove(product);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Product not found with Id {id}");
            }
        }
    }
}
