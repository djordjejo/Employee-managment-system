using employee_management_system_b.Data;
using employee_management_system_b.Models;
using employee_management_system_b.Repositories.IRepository;
using Microsoft.EntityFrameworkCore;

namespace employee_management_system_b.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly ApplicationDb _context;
        public IRepository<Employee> Employees { get; }

        public IRepository<Company> Companies { get; }

        public IRepository<Department> Departments { get; }

        public IRepository<Project> Projects { get; }

        public IRepository<EmployeeProject> EmployeeProject { get; }

        public UnitOfWork(ApplicationDb context)
        {
            _context = context;

            Employees = new Repository<Employee>(_context);
            Companies = new Repository<Company>(_context);
            Departments = new Repository<Department>(_context);
            Projects = new Repository<Project>(_context);
            EmployeeProject = new Repository<EmployeeProject>(_context);
        }
        public void Commit()
        {
            throw new NotImplementedException();
        }
    }
}
