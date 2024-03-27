using FluentValidation;
using RestaurantManagement.BLL.DTOs.Reservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Reservation
{
    public class ReservationPostDtoValidator : AbstractValidator<ReservationPostDto>
    {
        public ReservationPostDtoValidator()
        {
            RuleFor(x => x.TableId)
            .GreaterThan(0).WithMessage("TableId must be greater than 0.");

            RuleFor(x => x.CustomerName)
                .NotEmpty().WithMessage("Customer name is required.")
                .Length(2, 50).WithMessage("Customer name must be between 2 and 50 characters.");

            RuleFor(x => x.CustomerPhone)
                .NotEmpty().WithMessage("Customer phone is required.")
                .Matches(new Regex(@"^\+?[1-9]\d{1,14}$")).WithMessage("Customer phone is not a valid international phone number.");
        }
    }
}
