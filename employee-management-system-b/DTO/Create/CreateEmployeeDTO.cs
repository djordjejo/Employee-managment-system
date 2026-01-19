using System.ComponentModel.DataAnnotations;

namespace employee_management_system_b.DTO.Create
{
    public class CreateEmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true;
        public Guid DepartmentId { get; set; }
        public Guid CompanyId { get; set; }
        public string Role { get; set; }
    }
}
