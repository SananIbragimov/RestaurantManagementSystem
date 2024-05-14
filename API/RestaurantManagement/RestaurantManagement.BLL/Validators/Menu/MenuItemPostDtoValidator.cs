using FluentValidation;
using RestaurantManagement.BLL.DTOs.Menu;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Menu
{
    public class MenuItemPostDtoValidator : AbstractValidator<MenuItemPostDto>
    {
        public MenuItemPostDtoValidator()
        {
            RuleFor(x => x.MenuId)
            .GreaterThan(0)
            .WithMessage("Valid Menu Id is required.");

            RuleFor(x => x.ProductId)
                .GreaterThan(0)
                .WithMessage("Valid Product Id is required.");

            RuleFor(x => x.PromotionalPrice)
                .GreaterThanOrEqualTo(0)
                .When(x => x.PromotionalPrice.HasValue)
                .WithMessage("Promotional Price must be greater than or equal to 0.");
        }
    }
}
