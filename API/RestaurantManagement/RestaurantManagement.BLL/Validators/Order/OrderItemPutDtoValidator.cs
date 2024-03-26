using FluentValidation;
using RestaurantManagement.BLL.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Order
{
    public class OrderItemPutDtoValidator : AbstractValidator<OrderItemPutDto>
    {
        public OrderItemPutDtoValidator()
        {
            RuleFor(x => x.OrderId)
               .GreaterThan(0)
               .WithMessage("Order Id must be greater than 0.");

            RuleFor(x => x.ProductId)
                .GreaterThan(0)
                .WithMessage("Product Id must be greater than 0.");

            RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Quantity must be greater than 0.");
        }
    }
}
