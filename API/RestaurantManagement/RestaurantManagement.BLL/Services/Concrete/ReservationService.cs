using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<ReservationDto>> GetAllAsync()
        {
            var reservations = await _dbContext.Reservations.AsNoTracking().ToListAsync();

            var reservationDtos = _mapper.Map<List<ReservationDto>>(reservations);

            return reservationDtos;
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
            var reservation = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.Id == id);
            if (reservation != null)
            {
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
            var reservation = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.Id == id);
            if (reservation != null)
            {
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
