namespace employee_management_system_b.Models
{
    public class EmployeeProject
    {
        public Guid EmployeeId { get;  set; }
        public Employee Employee { get; set; }

        public Guid ProjectId { get; set; }
        public Project Project { get;set; }

        public int AllocationPercentage { get; set; } // 0–100
        public DateTime StartDate { get;  set; }
        public DateTime? EndDate { get; set; }
    }

}
