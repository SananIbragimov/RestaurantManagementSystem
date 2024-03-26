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
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public OrderService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<OrderDto>> GetAllAsync()
        {
            var orders = await _dbContext.Orders.AsNoTracking().ToListAsync();

            var orderDtos = _mapper.Map<List<OrderDto>>(orders);

            return orderDtos;
        }

        public async Task<OrderDto> GetByIdAsync(int id)
        {
            var order = await _dbContext.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);
            var orderDto = _mapper.Map<OrderDto>(order);

            return orderDto;
        }

        public async Task<OrderDto> CreateOrderAsync(OrderPostDto orderPostDto)
        {
            var order = _mapper.Map<Order>(orderPostDto);

            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();

            var orderDto = _mapper.Map<OrderDto>(order);

            return orderDto;
        }

        public async Task UpdateOrderAsync(int id, OrderPutDto orderPutDto)
        {
            var order = await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                _mapper.Map(orderPutDto, order);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Order with Id {id} not found");
            }
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                _dbContext.Orders.Remove(order);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Order with Id {id} not found");
            }
        }
    }
}
