using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using sclask.DTO;

namespace sclask.Managers
{
    public interface IMatchesManager
    {
        bool ValidatePayload(MultiPlayerMatchRequest payload);
        Task<int> RecordMultiPlayerGame(MultiPlayerMatchRequest payload);
        List<IGrouping<int,RecentMatches>> GetRecentMatches();
    }
}