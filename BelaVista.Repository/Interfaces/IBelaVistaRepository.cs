using System.Threading.Tasks;

namespace BelaVista.Repository
{
    public interface IBelaVistaRepository
    {
        void Add<T>(T entity) where T : class;

        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task <bool> SaveChanges();
    }
}