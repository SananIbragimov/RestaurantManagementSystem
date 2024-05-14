using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RestaurantManagement.BLL.DTOs.Category;
using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Report;
using RestaurantManagement.BLL.DTOs.Reservation;
using RestaurantManagement.BLL.Enums;
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
    public class ReservationService : IReservationService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ReservationService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PageResultDto<ReservationDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _dbContext.Reservations.CountAsync();
            var reservations = await _dbContext.Reservations.Include(t => t.Table)
                                        .Skip((pageNumber - 1) * pageSize)
                                        .Take(pageSize)
                                        .ToListAsync();

            var reservationDtos = _mapper.Map<List<ReservationDto>>(reservations);

            return new PageResultDto<ReservationDto>
            {
                Items = reservationDtos,
                TotalCount = totalCount
            };
        }

        public async Task<ReservationDto> GetByIdAsync(int id)
        {
            var reservation = await _dbContext.Reservations.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
            var reservationDto = _mapper.Map<ReservationDto>(reservation);

            return reservationDto;
        }

        public async Task<ReservationDto> CreateReservationAsync(ReservationPostDto reservationPostDto)
        {
            var reservation = _mapper.Map<Reservation>(reservationPostDto);

            _dbContext.Reservations.Add(reservation);
            await _dbContext.SaveChangesAsync();

            var table = await _dbContext.Tables.FirstOrDefaultAsync(t => t.Id == reservation.TableId);
            if (table != null)
            {
                table.IsReserved = true;
                table.TableStatus = TableStatusEnum.Reserved;
                if (reservation.ReservationTime <= DateTime.Now)
                {
                    table.TableStatus = TableStatusEnum.Occupied;
                }
                table.ReservationTime = reservation.ReservationTime;
                await _dbContext.SaveChangesAsync();
            }

            var reservationDto = _mapper.Map<ReservationDto>(reservation);

            return reservationDto;
        }

        public async Task UpdateReservationAsync(int id, ReservationPutDto reservationPutDto)
        {
            var reservation = await _dbContext.Reservations.Include(r => r.Table).FirstOrDefaultAsync(r => r.Id == id);
            if (reservation != null)
            {
                reservation.Table.ReservationTime = reservationPutDto.ReservationTime;
                reservation.Table.TableStatus = TableStatusEnum.Reserved;
                await _dbContext.SaveChangesAsync();

                _mapper.Map(reservationPutDto, reservation);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Reservation with Id {id} not found");
            }
        }

        public async Task DeleteReservationAsync(int id)
        {
            var reservation = await _dbContext.Reservations.Include(r => r.Table).FirstOrDefaultAsync(r => r.Id == id);
            if (reservation != null)
            {
                reservation.Table.IsReserved = false;
                reservation.Table.TableStatus = TableStatusEnum.Available;
                await _dbContext.SaveChangesAsync();

                _dbContext.Reservations.Remove(reservation);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Reservation with Id {id} not found");
            }
        }
    }
}
