using FluentValidation;
using RestaurantManagement.BLL.DTOs.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Account
{
    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Username can't be empty")
                .Length(5, 25).WithMessage("Username must be between 5 and 25 characters");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password can't be empty")
                .MinimumLength(8).WithMessage("Password can't be less than 8 characters")
                .MaximumLength(30).WithMessage("Password can't be greater than 30 characters");
        }
    }
}
