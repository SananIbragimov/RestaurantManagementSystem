using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Menu;
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
    public class MenuService : IMenuService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public MenuService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<MenuDto>> GetAllAsync()
        {
            var menus = await _dbContext.Menus.AsNoTracking().ToListAsync();

            var menuDtos = _mapper.Map<List<MenuDto>>(menus);

            return menuDtos;
        }

        public async Task<MenuDto> GetByIdAsync(int id)
        {
            var menu =await _dbContext.Menus.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);
            var menuDto = _mapper.Map<MenuDto>(menu);

            return menuDto;
        }

        public async Task<MenuDto> CreateMenuAsync(MenuPostDto menuPostDto)
        {
            var menu = _mapper.Map<Menu>(menuPostDto);

            _dbContext.Menus.Add(menu);
            await _dbContext.SaveChangesAsync();

            var menuDto = _mapper.Map<MenuDto>(menu);

            return menuDto;
        }

        public async Task UpdateMenuAsync(int id, MenuPutDto menuPutDto)
        {
            var menu =await _dbContext.Menus.FirstOrDefaultAsync(m => m.Id == id);
            if (menu != null)
            {
                _mapper.Map(menuPutDto, menu);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Menu with Id {id} not found");
            }
        }

        public async Task DeleteMenuAsync(int id)
        {
            var menu =await _dbContext.Menus.FirstOrDefaultAsync(m => m.Id == id);
            if (menu != null)
            {
                _dbContext.Menus.Remove(menu);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Menu with Id {id} not found");
            }
        }
    }
}
