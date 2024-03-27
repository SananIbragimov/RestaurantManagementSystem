using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RestaurantManagement.BLL.DTOs.Setting;
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
    public class SettingService : ISettingService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public SettingService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<SettingDto>> GetAllAsync()
        {
            var settings = await _dbContext.Settings.AsNoTracking().ToListAsync();

            var settingDtos = _mapper.Map<List<SettingDto>>(settings);

            return settingDtos;
        }

        public async Task<SettingDto> GetByIdAsync(int id)
        {
            var setting = await _dbContext.Settings.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
            var settingDto = _mapper.Map<SettingDto>(setting);

            return settingDto;
        }

        public async Task<SettingDto> CreateSettingAsync(SettingPostDto settingPostDto)
        {
            var setting = _mapper.Map<Setting>(settingPostDto);

            _dbContext.Settings.Add(setting);
            await _dbContext.SaveChangesAsync();

            var settingDto = _mapper.Map<SettingDto>(setting);

            return settingDto;
        }

        public async Task UpdateSettingAsync(int id, SettingPutDto settingPutDto)
        {
            var setting = await _dbContext.Settings.FirstOrDefaultAsync(r => r.Id == id);
            if (setting != null)
            {
                _mapper.Map(settingPutDto, setting);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Setting with Id {id} not found");
            }
        }

        public async Task DeleteSettingAsync(int id)
        {
            var setting = await _dbContext.Settings.FirstOrDefaultAsync(r => r.Id == id);
            if (setting != null)
            {
                _dbContext.Settings.Remove(setting);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Setting with Id {id} not found");
            }
        }
    }
}
