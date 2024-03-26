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
    public class MenuItemService : IMenuItemService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public MenuItemService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<MenuItemDto>> GetAllAsync()
        {
            var menuItems = await _dbContext.MenuItems.AsNoTracking().ToListAsync();

            var menuItemDtos = _mapper.Map<List<MenuItemDto>>(menuItems);

            return menuItemDtos;
        }

        public async Task<MenuItemDto> GetByIdAsync(int id)
        {
            var menuItem = await _dbContext.MenuItems.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);
            var menuItemDto = _mapper.Map<MenuItemDto>(menuItem);

            return menuItemDto;
        }

        public async Task<MenuItemDto> CreateMenuItemAsync(MenuItemPostDto menuItemPostDto)
        {
            var menuItem = _mapper.Map<MenuItem>(menuItemPostDto);

            _dbContext.MenuItems.Add(menuItem);
            await _dbContext.SaveChangesAsync();

            var menuItemDto = _mapper.Map<MenuItemDto>(menuItem);

            return menuItemDto;
        }

        public async Task UpdateMenuItemAsync(int id, MenuItemPutDto menuItemPutDto)
        {
            var menuItem = await _dbContext.MenuItems.FirstOrDefaultAsync(m => m.Id == id);
            if (menuItem != null)
            {
                _mapper.Map(menuItemPutDto, menuItem);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"MenuItem with Id {id} not found");
            }
        }

        public async Task DeleteMenuItemAsync(int id)
        {
            var menuItem = await _dbContext.MenuItems.FirstOrDefaultAsync(m => m.Id == id);
            if (menuItem != null)
            {
                _dbContext.MenuItems.Remove(menuItem);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"MenuItem with Id {id} not found");
            }
        }

       
    }
}
