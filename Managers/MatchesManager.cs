using System;
using System.Linq;
using sclask.DTO;
using sclask.Models;
using sclask.Services;

namespace sclask.Managers
{
    public class MatchesManager : IMatchesManager
    {
        private readonly SclaskDbContext _dbContext;

        public MatchesManager(SclaskDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public bool RecordMultiPlayerGame(MultiPlayerMatchRequest payload)
        {
            var game = _dbContext.Games.FirstOrDefault(g => g.Id == payload.GameId);
            if (game == null)
            {
                return false;
            }
            if (payload.Players.Any(player => _dbContext.Players.FirstOrDefault(p => p.Id == player.PlayerId) == null))
            {
                return false;
            }

            var match = new Match();
            match.Date = DateTime.Now;

            var ratings = _dbContext.Ratings.Where(r => r.PlayerId == match.PlayerAId || r.PlayerId == match.PlayerBId).ToList();

            match = MatchServices.SetPredicitions(match, ratings);
            var updatedRatings = MatchServices.UpdateRatings(match, ratings);

            var playerARating = ratings.Find(r => r.PlayerId == match.PlayerAId && r.GameId == match.GameId);
            var playerAUpdatedRating = updatedRatings.Find(r => r.PlayerId == match.PlayerAId);
            if (playerARating != null)
            {
                playerARating.Score = playerAUpdatedRating.Score;
                _dbContext.Ratings.Update(playerARating);
            }
            else
            {
                _dbContext.Ratings.Add(playerAUpdatedRating);
            }

            var playerBRating = ratings.Find(r => r.PlayerId == match.PlayerBId && r.GameId == match.GameId);
            var playerBUpdatedRating = updatedRatings.Find(r => r.PlayerId == match.PlayerBId);
            if (playerBRating != null)
            {
                playerBRating.Score = playerBUpdatedRating.Score;
                _dbContext.Ratings.Update(playerBRating);
            }
            else
            {
                _dbContext.Ratings.Add(playerBUpdatedRating);
            }

            try
            {
                _dbContext.Add(match);
                _dbContext.SaveChanges();
                return true;
            }
            catch
            {
            }

            return false;
        }
    }
}