using RestaurantManagement.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Report
{
    public class ReportPostDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public ReportTypeEnum ReportType { get; set; }
        public string Data { get; set; }
    }
}
