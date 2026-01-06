namespace employee_management_system_b.DTO.Basics
{
    public class EmployeeBasicDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Email { get; set; }
    }
}
