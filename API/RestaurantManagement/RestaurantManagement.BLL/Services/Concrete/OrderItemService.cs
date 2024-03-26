using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.DTOs.Order;
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
    public class OrderItemService : IOrderItemService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public OrderItemService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<OrderItemDto>> GetAllAsync()
        {
            var orderItems = await _dbContext.OrderItems.AsNoTracking().ToListAsync();

            var orderItemDtos = _mapper.Map<List<OrderItemDto>>(orderItems);

            return orderItemDtos;
        }

        public async Task<OrderItemDto> GetByIdAsync(int id)
        {
            var orderItem = await _dbContext.OrderItems.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);
            var orderItemDto = _mapper.Map<OrderItemDto>(orderItem);

            return orderItemDto;
        }

        public async Task<OrderItemDto> CreateOrderItemAsync(OrderItemPostDto orderItemPostDto)
        {
            var orderItem = _mapper.Map<OrderItem>(orderItemPostDto);

            _dbContext.OrderItems.Add(orderItem);
            await _dbContext.SaveChangesAsync();

            var orderItemDto = _mapper.Map<OrderItemDto>(orderItem);

            return orderItemDto;
        }

        public async Task UpdateOrderItemAsync(int id, OrderItemPutDto orderItemPutDto)
        {
            var orderItem = await _dbContext.OrderItems.FirstOrDefaultAsync(o => o.Id == id);
            if (orderItem != null)
            {
                _mapper.Map(orderItemPutDto, orderItem);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"OrderItem with Id {id} not found");
            }
        }

        public async Task DeleteOrderItemAsync(int id)
        {
            var orderItem = await _dbContext.OrderItems.FirstOrDefaultAsync(o => o.Id == id);
            if (orderItem != null)
            {
                _dbContext.OrderItems.Remove(orderItem);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"OrderItem with Id {id} not found");
            }
        }
    }
}
