using System.ComponentModel.DataAnnotations;

namespace employee_management_system_b.DTO.Create
{
    public class CreateEmployeeDTO
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public int CompanyId { get; set; }  // Iz dropdown-a

        [Required]
        public int DepartmentId { get; set; }  // Iz dropdown-a

        // Lista projekata koje dodeljuješ zaposlenom
        public List<int> ProjectIds { get; set; } = new();
    }
}
