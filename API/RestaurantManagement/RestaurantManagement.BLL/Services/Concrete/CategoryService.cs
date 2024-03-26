using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Category;
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
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            var categories = await _dbContext.Categories.Include(c=>c.Products).ToListAsync();
            var categoryDTOs = _mapper.Map<List<CategoryDto>>(categories);
            return categoryDTOs;
        }

        public async Task<CategoryDto> GetByIdAsync(int id)
        {
            var category = await _dbContext.Categories.Include(c => c.Products).FirstOrDefaultAsync(c => c.Id == id);
            var categoryDto = _mapper.Map<CategoryDto>(category);

            return categoryDto;
        }

        public async Task<CategoryDto> GetByNameAsync(string name)
        {
            var category = await _dbContext.Categories.Include(c => c.Products).FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());
            var categoryDto = _mapper.Map<CategoryDto>(category);

            return categoryDto;
        }

        public async Task<CategoryDto> CreateCategoryAsync(CategoryPostDto categoryPostDto)
        {
            var category = _mapper.Map<Category>(categoryPostDto);

            await _dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();

            var categoryDto = _mapper.Map<CategoryDto>(category);

            return categoryDto;

        }

        public async Task UpdateCategoryAsync(int id, CategoryPutDto categoryPutDto)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            if(category != null)
            {
                category.Name = categoryPutDto.Name;

                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Category with Id {id} not found.");
            }
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category != null)
            {
                _dbContext.Categories.Remove(category);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Category with Id {id} not found.");
            }
        }
    }
}
