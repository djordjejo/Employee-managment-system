namespace employee_management_system_b.Models
{
    public class Department
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

        public ICollection<Employee> Employees { get; private set; } = new List<Employee>();
    }

}
