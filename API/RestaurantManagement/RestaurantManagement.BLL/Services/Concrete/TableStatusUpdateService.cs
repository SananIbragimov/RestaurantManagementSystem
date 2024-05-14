using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using RestaurantManagement.DAL.Data;
using RestaurantManagement.BLL.Enums;
using Microsoft.EntityFrameworkCore;

public class TableStatusUpdateService : IHostedService, IDisposable
{
    private Timer _timer;
    private readonly IServiceProvider _serviceProvider;

    public TableStatusUpdateService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(2));
        return Task.CompletedTask;
    }

    private void DoWork(object state)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var reservationsToUpdate = dbContext.Reservations.Include(r => r.Table)
                .Where(r => r.ReservationTime <= DateTime.Now && r.Table.TableStatus == TableStatusEnum.Reserved)
                .ToList();

            foreach (var reservation in reservationsToUpdate)
            {
                reservation.Table.TableStatus = TableStatusEnum.Occupied;
            }

            dbContext.SaveChanges();
        }
    }


    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}
