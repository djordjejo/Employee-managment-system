using employee_management_system_b.DTO.Basics;

namespace employee_management_system_b.DTO.Response
{
    public class ProjectDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int CompanyId { get; set; }
        public string CompanyName { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Zaposleni na projektu
        public List<EmployeeBasicDTO> Employees { get; set; } = new();
    }
}
