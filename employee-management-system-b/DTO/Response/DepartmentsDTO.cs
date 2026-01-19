using employee_management_system_b.DTO.Basics;

namespace employee_management_system_b.DTO.Response
{
    public class DepartmentsDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CompanyId { get; set; }
        public string CompanyName { get; set; }
        public List<EmployeeBasicDTO> Employees { get; set; } = new();
    }
}
