namespace employee_management_system_b.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public Guid CompanyId { get;  set; }
        public Company Company { get; set; }


        public ICollection<EmployeeProject> Employees { get; private set; } = new List<EmployeeProject>();

    }
}
