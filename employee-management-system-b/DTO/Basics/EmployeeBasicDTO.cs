namespace employee_management_system_b.DTO.Basics
{
    public class EmployeeBasicDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Email { get; set; }
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}
