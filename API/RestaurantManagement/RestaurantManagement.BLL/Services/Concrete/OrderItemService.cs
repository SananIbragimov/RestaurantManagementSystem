using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.DTOs.Order;
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
            var orderItems = await _dbContext.OrderItems.Include(oi => oi.Order).ToListAsync();

            var orderItemDtos = _mapper.Map<List<OrderItemDto>>(orderItems);

            return orderItemDtos;
        }

        public async Task<OrderItemDto> GetByIdAsync(int id)
        {
            var orderItem = await _dbContext.OrderItems.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);
            var orderItemDto = _mapper.Map<OrderItemDto>(orderItem);

            return orderItemDto;
        }

        public async Task<List<OrderItemDto>> GetAllOrderItemsByOrderIdAsync(int orderId)
        {
            var orderItems = await _dbContext.OrderItems
                              .Include(oi => oi.Product)
                              .Include(oi => oi.Order)
                              .ThenInclude(order => order.OrderItems)
                              .Where(oi => oi.OrderId == orderId)
                              .ToListAsync();

            var orderItemDtos = _mapper.Map<List<OrderItemDto>>(orderItems);

            return orderItemDtos;
        }

        public async Task<OrderItemDto> CreateOrderItemAsync(OrderItemPostDto orderItemPostDto)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == orderItemPostDto.ProductId);
            if (product == null)
            {
                throw new KeyNotFoundException("Product not found!");
            }

            var existingOrderItem = await _dbContext.OrderItems
                                                   .Where(oi => oi.OrderId == orderItemPostDto.OrderId &&
                                                                oi.ProductId == orderItemPostDto.ProductId)
                                                   .FirstOrDefaultAsync();

            if (existingOrderItem != null)
            {
                existingOrderItem.Quantity += orderItemPostDto.Quantity;
                _dbContext.OrderItems.Update(existingOrderItem);
                await _dbContext.SaveChangesAsync();
                var orderItemDto = _mapper.Map<OrderItemDto>(existingOrderItem);
                return orderItemDto;
            }
            else
            {
                var orderItem = _mapper.Map<OrderItem>(orderItemPostDto);
                orderItem.Price = product.Price;
                _dbContext.OrderItems.Add(orderItem);
                await _dbContext.SaveChangesAsync();
                var orderItemDto = _mapper.Map<OrderItemDto>(orderItem);
                return orderItemDto;
            }
        }



        public async Task UpdateOrderItemAsync(int id, OrderItemPutDto orderItemPutDto)
        {
            var orderItem = await _dbContext.OrderItems
                                    .FirstOrDefaultAsync(oi => oi.Id == id &&
                                                               oi.OrderId == orderItemPutDto.OrderId &&
                                                               oi.ProductId == orderItemPutDto.ProductId);

            if (orderItem != null)
            {
                orderItem.Quantity += orderItemPutDto.Quantity;
                _mapper.Map(orderItemPutDto, orderItem);
                _dbContext.OrderItems.Update(orderItem);
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
