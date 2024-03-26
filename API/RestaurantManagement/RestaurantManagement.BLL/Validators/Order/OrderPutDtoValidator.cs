using FluentValidation;
using RestaurantManagement.BLL.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Order
{
    public class OrderPutDtoValidator : AbstractValidator<OrderPutDto>
    {
        public OrderPutDtoValidator()
        {
            RuleFor(x => x.TableId)
            .GreaterThan(0)
            .WithMessage("Valid Table Id is required.");

            RuleFor(x => x.AppUserId)
                .NotEmpty()
                .WithMessage("App User Id is required.")
                .Length(1, 128)
                .WithMessage("App User Id must be between 1 and 128 characters.");
        }
    }
}
