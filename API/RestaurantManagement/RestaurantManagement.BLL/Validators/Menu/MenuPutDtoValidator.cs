using FluentValidation;
using RestaurantManagement.BLL.DTOs.Menu;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Menu
{
    public class MenuPutDtoValidator : AbstractValidator<MenuPutDto>
    {
        public MenuPutDtoValidator()
        {
            RuleFor(menu => menu.Name)
            .NotEmpty().WithMessage("Menu name is required.")
            .Length(2, 100).WithMessage("Menu name must be between 2 and 100 characters.");

            RuleFor(menu => menu.ValidFrom)
                .LessThanOrEqualTo(menu => menu.ValidTo)
                .When(menu => menu.ValidTo.HasValue)
                .WithMessage("Valid From date must be less than or equal to Valid To date.");

            RuleFor(menu => menu.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0.");

            RuleFor(menu => menu.ValidTo)
                .GreaterThan(menu => menu.ValidFrom)
                .When(menu => menu.ValidTo.HasValue)
                .WithMessage("Valid To date must be greater than Valid From date.");
        }
    }
}
