using employee_management_system_b.Auth;
using Microsoft.AspNetCore.Identity;
namespace employee_management_system_b.Models
{
    public class Employee
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool isActive { get; set; }


        public Guid? DepartmentId { get; set; }
        public Department Department { get; set; }
        public Company Company { get; set; }
        public Guid CompanyId{ get; set; }
        public ICollection<EmployeeProject> Projects { get; private set; } = new List<EmployeeProject>();

        public string Role { get; set; }
    }
}
