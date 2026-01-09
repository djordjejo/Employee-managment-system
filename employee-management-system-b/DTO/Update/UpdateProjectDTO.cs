namespace employee_management_system_b.DTO.Update
{
    public class UpdateProjectDTO
    {
        public string Title { get;  set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public Guid CompanyId { get; set; }
        public List<Guid> EmployeesId { get; set; }
    }
}
