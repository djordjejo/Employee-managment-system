using System.ComponentModel.DataAnnotations;

namespace employee_management_system_b.DTO.Create
{
    public class CreateProjectDTO
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; }
        [Required]
        [StringLength(200)]
        public string Description { get; set; }

        [Required]
        public int CompanyId { get; set; }  

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public List<Guid> EmployeeIds{ get; set; } = new();
    }
}
