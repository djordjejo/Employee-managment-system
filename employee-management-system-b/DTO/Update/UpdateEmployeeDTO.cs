namespace employee_management_system_b.DTO.Update
{
    public class UpdateEmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid CompanyId { get; set; }
        public string Role { get; set; }
    }
}
