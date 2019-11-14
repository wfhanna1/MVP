using System.Threading.Tasks;
using sclask.DTO;

namespace sclask.Managers
{
    public interface IMatchesManager
    {
        bool ValidatePayload(MultiPlayerMatchRequest payload);
        Task RecordMultiPlayerGame(MultiPlayerMatchRequest payload);
    }
}