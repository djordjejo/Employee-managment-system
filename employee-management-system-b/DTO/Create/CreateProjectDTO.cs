using System.ComponentModel.DataAnnotations;

namespace employee_management_system_b.DTO.Create
{
    public class CreateProjectDTO
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        [StringLength(200)]
        public string Description { get; set; }

        [Required]
        public int CompanyId { get; set; }  // Iz dropdown-a

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public List<int> EmployeeIds { get; set; } = new();
    }
}
