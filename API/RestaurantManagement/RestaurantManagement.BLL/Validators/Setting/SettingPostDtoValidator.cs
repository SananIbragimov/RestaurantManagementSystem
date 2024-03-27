using FluentValidation;
using RestaurantManagement.BLL.DTOs.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Setting
{
    public class SettingPostDtoValidator : AbstractValidator<SettingPostDto>
    {
        public SettingPostDtoValidator()
        {
            RuleFor(s => s.Key)
            .NotEmpty().WithMessage("Key is required.")
            .Length(1, 50).WithMessage("Key must be between 1 and 50 characters.");

            RuleFor(s => s.Value)
                .NotEmpty().WithMessage("Value is required.");

            RuleFor(s => s.Description)
                .MaximumLength(500).WithMessage("Description cannot be more than 500 characters.");
        }
    }
}
