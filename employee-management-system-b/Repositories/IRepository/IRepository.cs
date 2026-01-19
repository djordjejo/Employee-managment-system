using System.Linq.Expressions;

namespace employee_management_system_b.Repositories.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<T> GetById(Guid id, params Expression<Func<T, object>>[] includes);
        Task<IEnumerable<T>> GetAll(Func<IQueryable<T>, IQueryable<T>> includeFunc = null);
        Task DeleteAll();

    }
}
