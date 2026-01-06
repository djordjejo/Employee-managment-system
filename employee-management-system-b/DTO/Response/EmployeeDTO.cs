using employee_management_system_b.DTO.Basics;

namespace employee_management_system_b.DTO.Response
{
    public class EmployeeDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Email { get; set; }

        public Guid CompanyId { get; set; }
        public string CompanyName { get; set; }

        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }

        // Projekti na kojima radi
        public List<ProjectBasicDTO> Projects { get; set; } = new();
    }
}
