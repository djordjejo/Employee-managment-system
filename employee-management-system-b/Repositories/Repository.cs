using employee_management_system_b.Data;
using employee_management_system_b.Repositories.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
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

        public async Task Add(T entity)
        {
           await dbSet.AddAsync(entity);
        }

        public void Delete(T entity)
        {
            dbSet.Remove(entity);
        }

        public Task DeleteAll()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = dbSet;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

        public async Task<T> GetById(Guid id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = dbSet;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(e => EF.Property<Guid>(e, "Id") == id);
        }

        public void Update(T entity)
        {
            dbSet.Update(entity);
        }

       
    }
}
