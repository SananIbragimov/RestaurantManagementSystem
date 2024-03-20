using FluentValidation;
using RestaurantManagement.BLL.DTOs.User;
using RestaurantManagement.BLL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.User
{
    public class UserDtoValidator : AbstractValidator<UserDto>
    {
        public UserDtoValidator()
        {
            RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("FirstName can't be empty")
            .Length(3, 50).WithMessage("FirstName must be between 2 and 50 characters")
            .Matches("^[a-zA-Z ]*$").WithMessage("FirstName must contain only letters and spaces.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("LastName can't be empty")
                .Length(3, 50).WithMessage("LastName must be between 2 and 50 characters")
                .Matches("^[a-zA-Z ]*$").WithMessage("LastName must contain only letters and spaces.");

            RuleFor(x => x.UserName)
            .NotEmpty().WithMessage("UserName can't be empty")
            .Length(5, 30).WithMessage("UserName must be between 5 and 30 characters");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("PhoneNumber can't be empty")
                .Matches(@"^\+[1-9]\d{1,14}$").WithMessage("PhoneNumber must be in international format and valid.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email can't be empty")
                .EmailAddress().WithMessage("Email format is invalid!");

            RuleFor(x => x.Role).Must(role => Enum.IsDefined(typeof(Roles), role))
               .WithMessage($"Invalid role. Valid roles are: {string.Join(", ", Enum.GetNames(typeof(Roles)))}");
        }
    }
}
