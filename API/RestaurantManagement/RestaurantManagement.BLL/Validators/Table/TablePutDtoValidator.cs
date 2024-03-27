using FluentValidation;
using RestaurantManagement.BLL.DTOs.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Table
{
    public class TablePutDtoValidator : AbstractValidator<TablePutDto>
    {
        public TablePutDtoValidator()
        {
            RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Table name is required.")
            .Length(2, 100).WithMessage("Table name must be between 2 and 100 characters.");

            RuleFor(x => x.Capacity)
                .GreaterThan(0).WithMessage("Capacity must be greater than 0.");

            RuleFor(x => x.AppUserId)
                .NotEmpty().WithMessage("AppUser ID is required.");

            When(x => x.IsReserved, () =>
            {
                RuleFor(x => x.ReservationTime)
                    .NotNull().WithMessage("Reservation time is required when the table is reserved.")
                    .Must(date => date == null || date > DateTime.Now).WithMessage("Reservation time must be in the future.");
            });

            When(x => !x.IsReserved, () =>
            {
                RuleFor(x => x.ReservationTime)
                    .Null().WithMessage("Reservation time must be null when the table is not reserved.");
            });

            RuleFor(x => x.TableStatus)
                .IsInEnum().WithMessage("Invalid table status.");
        }
    }
}
