
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using RestaurantManagement.BLL.Configuration;
using RestaurantManagement.DAL.Entities;
using FluentValidation.AspNetCore;
using FluentValidation;
using RestaurantManagement.BLL.Services.concrete;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.BLL.Services.Concrete;
using RestaurantManagement.BLL.Validators.Account;

namespace RestaurantManagement.WebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthenticationServices(builder.Configuration);
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            builder.Services.AddDbContextConfiguration(builder.Configuration);
            builder.Services.AddIdentityConfiguration(builder.Configuration);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerServices();
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services
                .AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters()
                .AddValidatorsFromAssemblyContaining<LoginDtoValidator>();


            var app = builder.Build();

            await DbSeedService.SeedDatabaseAsync(app.Services);
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.Use(async (context, next) =>
            {
                var token = context.Request.Cookies["AuthToken"];
                if (!string.IsNullOrEmpty(token))
                {
                    context.Request.Headers.Append("Authorization", "Bearer " + token);
                }

                await next();
            });
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            await app.RunAsync();
        }
    }
}
