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
            var menuItems = await _dbContext.MenuItems
                                        .Include(mi => mi.Menu)
                                        .Include(mi => mi.Product)
                                        .AsNoTracking()
                                        .ToListAsync();


            var menuItemDtos = _mapper.Map<List<MenuItemDto>>(menuItems);
            foreach (var menuItem in menuItemDtos)
            {
                menuItem.DisplayPrice = menuItem.PromotionalPrice ?? menuItem.Product.Price;
            }

            return menuItemDtos;
        }

        public async Task<MenuItemDto> GetByIdAsync(int id)
        {
            var menuItem = await _dbContext.MenuItems
                                        .Include(mi => mi.Menu)
                                        .Include(mi => mi.Product)
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(m => m.Id == id);
            var menuItemDto = _mapper.Map<MenuItemDto>(menuItem);
            menuItemDto.DisplayPrice = menuItemDto.PromotionalPrice ?? menuItemDto.Product.Price;

            return menuItemDto;
        }

        public async Task<List<MenuItemDto>> GetAllMenuItemsByMenuIdAsync(int menuId)
        {
            var menuItems = await _dbContext.MenuItems
                                             .Include(mi => mi.Menu)
                                             .Include(mi => mi.Product)
                                             .Where(mi => mi.MenuId == menuId)
                                             .AsNoTracking()
                                             .ToListAsync();

            var menuItemDtos = _mapper.Map<List<MenuItemDto>>(menuItems);

            foreach (var menuItem in menuItemDtos)
            {
                menuItem.DisplayPrice = menuItem.PromotionalPrice ?? menuItem.Product.Price;
            }

            var uniqueMenuItems = menuItemDtos
                                   .GroupBy(mi => mi.ProductId)
                                   .Select(g => g.First())
                                   .ToList();

            await UpdateMenuPriceAsync(menuId);

            return uniqueMenuItems;
        }



        public async Task<MenuItemDto> CreateMenuItemAsync(MenuItemPostDto menuItemPostDto)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == menuItemPostDto.ProductId);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with Id {menuItemPostDto.ProductId} not found");
            }

            if (menuItemPostDto.PromotionalPrice.HasValue && menuItemPostDto.PromotionalPrice.Value > product.Price)
            {
                throw new ArgumentException("PromotionalPrice cannot be greater than the product's price.");
            }

            var menuItem = _mapper.Map<MenuItem>(menuItemPostDto);

            _dbContext.MenuItems.Add(menuItem);
            await _dbContext.SaveChangesAsync();

            await UpdateMenuPriceAsync(menuItem.MenuId);

            var menuItemDto = _mapper.Map<MenuItemDto>(menuItem);

            return menuItemDto;
        }


        public async Task UpdateMenuItemAsync(int id, MenuItemPutDto menuItemPutDto)
        {
            var menuItem = await _dbContext.MenuItems.FirstOrDefaultAsync(m => m.Id == id);
            if (menuItem != null)
            {
                await UpdateMenuPriceAsync(menuItem.MenuId);
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
                await UpdateMenuPriceAsync(menuItem.MenuId);
                _dbContext.MenuItems.Remove(menuItem);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"MenuItem with Id {id} not found");
            }
        }

        public async Task UpdateMenuPriceAsync(int menuId)
        {
            var menu = await _dbContext.Menus.Include(m => m.MenuItems)
                                              .ThenInclude(mi => mi.Product)
                                              .FirstOrDefaultAsync(m => m.Id == menuId);
            if (menu == null) return;

            decimal totalPrice = menu.MenuItems.Sum(mi => mi.PromotionalPrice.HasValue && mi.PromotionalPrice.Value < mi.Product.Price ? mi.PromotionalPrice.Value : mi.Product.Price);
            menu.Price = totalPrice;
            await _dbContext.SaveChangesAsync();
        }

    }
}
