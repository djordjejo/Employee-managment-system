using employee_management_system_b.Models;

namespace employee_management_system_b.DTO.Update
{
    public class UpdateDepartmentDTO
    {
        public string Name { get; private set; }
        public string Description { get; set; }
        public Guid CompanyId { get; private set; }
        public List<Guid> EmployeesId{ get;  set; } 
    }
}
