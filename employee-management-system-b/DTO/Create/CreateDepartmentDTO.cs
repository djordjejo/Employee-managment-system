namespace employee_management_system_b.DTO.Create
{
    public class CreateDepartmentDTO
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public string Description { get; set;}
    }
}
