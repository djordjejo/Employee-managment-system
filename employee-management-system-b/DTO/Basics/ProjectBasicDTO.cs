namespace employee_management_system_b.DTO.Basics
{
    public class ProjectBasicDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
