using employee_management_system_b.Models;

namespace employee_management_system_b.Repositories.IRepository
{
    public interface IUnitOfWork
    {
        IRepository<Employee> Employees { get; }
        IRepository<Company> Companies { get; }
        IRepository<Department> Departments { get; }
        IRepository<Project> Projects  { get; }
        IRepository<EmployeeProject> EmployeeProject { get; }

        Task Commit();
    }
}
