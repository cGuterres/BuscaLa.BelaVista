using System.Threading.Tasks;

namespace BelaVista.Repository
{
    public class BelaVistaRepository : IBelaVistaRepository
    {
        private readonly BelaVistaContext _belaVistaContext;
        public BelaVistaRepository(BelaVistaContext belaVistaContext)
        {
            _belaVistaContext = belaVistaContext;
        }
        public void Add<T>(T entity) where T : class
        {
            _belaVistaContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _belaVistaContext.Remove(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _belaVistaContext.Update(entity);
        }
        public async Task<bool> SaveChanges()
        {
            // retorno maior que 0 adicionou no bd
            return (await _belaVistaContext.SaveChangesAsync()) > 0;
        }
    }
}