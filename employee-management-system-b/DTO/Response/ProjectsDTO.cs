using employee_management_system_b.DTO.Basics;

namespace employee_management_system_b.DTO.Response
{
    public class ProjectsDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public Guid CompanyId { get; set; }
        public string CompanyName { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<EmployeeBasicDTO> Employees { get; set; } = new();
    }
}
