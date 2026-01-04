using employee_management_system_b.Data;
using employee_management_system_b.Repositories.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace employee_management_system_b.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {

        private readonly ApplicationDb context; 
        private readonly DbSet<T> dbSet;

        public Repository(ApplicationDb context)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
        }

        public void Add(T entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public void DeleteAll()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
          return await dbSet.ToListAsync();
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
