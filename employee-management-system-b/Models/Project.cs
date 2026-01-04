namespace employee_management_system_b.Models
{
    public class Project
    {
        public Guid Id { get; private set; }

        public string Title { get; private set; }

        public DateTime StartDate { get; private set; }
        public DateTime? EndDate { get; private set; }

        public Guid CompanyId { get; private set; }
        public Company Company { get; private set; }


        public ICollection<EmployeeProject> Employees { get; private set; } = new List<EmployeeProject>();

    }
}
