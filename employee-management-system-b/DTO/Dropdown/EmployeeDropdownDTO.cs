namespace employee_management_system_b.DTO.Dropdown
{
    public class EmployeeDropdownDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
    }
}
