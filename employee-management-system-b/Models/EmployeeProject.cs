namespace employee_management_system_b.Models
{
    public class EmployeeProject
    {
        public Guid EmployeeId { get; private set; }
        public Employee Employee { get; private set; }

        public Guid ProjectId { get; private set; }
        public Project Project { get; private set; }

      
    }

}
