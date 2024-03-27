using FluentValidation;
using RestaurantManagement.BLL.DTOs.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Report
{
    public class ReportPostDtoValidator : AbstractValidator<ReportPostDto>
    {
        public ReportPostDtoValidator()
        {
            RuleFor(report => report.Title)
           .NotEmpty().WithMessage("Title is required.")
           .Length(5, 100).WithMessage("Title must be between 5 and 100 characters.");

            RuleFor(report => report.Description)
                .NotEmpty().WithMessage("Description is required.")
                .Length(10, 500).WithMessage("Description must be between 10 and 500 characters.");

            RuleFor(report => report.ReportType)
                .NotEmpty().WithMessage("ReportType is required.")
                .IsInEnum().WithMessage("ReportType is not valid.");

            RuleFor(report => report.Data)
                .NotEmpty().WithMessage("Data is required.");
        }
    }
}
