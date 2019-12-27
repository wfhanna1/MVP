using System.Collections.Generic;
using sclask.DTO;
using sclask.Models;

namespace sclask.Services
{
    public interface IMatchService
    {
        Match SetPredicitions(Match match, List<Rating> ratings);
        List<Rating> UpdateRatings(Match match, List<Rating> ratings);

        (decimal WinningNewEloScore, decimal LosingNewEloScore) CalculateNewEloScore(decimal winningScore,
            decimal losingScore, int gameId, int kFactor);
    }
}