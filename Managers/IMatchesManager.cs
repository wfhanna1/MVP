using sclask.DTO;

namespace sclask.Managers
{
    public interface IMatchesManager
    {
        bool RecordMultiPlayerGame(MultiPlayerMatchRequest payload);
    }
}