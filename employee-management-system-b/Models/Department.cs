namespace employee_management_system_b.Models
{
    public class Department
    {
        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public Guid CompanyId { get; private set; }
        public Company Company { get; private set; }

        public ICollection<Employee> Employees { get; private set; } = new List<Employee>();
    }

}
