namespace employee_management_system_b.Repositories.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<T> GetById(Guid id);
        Task<IEnumerable<T>> GetAll();
        Task DeleteAll();

    }
}
