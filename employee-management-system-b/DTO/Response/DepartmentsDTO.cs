namespace employee_management_system_b.DTO.Response
{
    public class DepartmentsDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CompanyName { get; set; }
        public List<EmployeeDTO> Employees { get; set; }
        }
}
