using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using sclask.DTO;
using sclask.Models;
using sclask.Services;

namespace sclask.Managers
{
    public class MatchesManager : IMatchesManager
    {
        private readonly SclaskDbContext _dbContext;
        private readonly IMatchService _matchService;

        public MatchesManager(SclaskDbContext dbContext, IMatchService matchService)
        {
            _dbContext = dbContext;
            _matchService = matchService;
        }

        public bool ValidatePayload(MultiPlayerMatchRequest payload)
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

            return true;
        }
        public async Task<int> RecordMultiPlayerGame(MultiPlayerMatchRequest payload)
        {
            var winningTeam = new List<Rating>();
            var losingTeam = new List<Rating>();
            float winningTeamScore = 0;
            float losingTeamScore = 0;
            
            //create the match because we need the match id for later use
            var match = new Match()
            {
                GameId = payload.GameId,
                Date = DateTime.Now
            };
            _dbContext.Matches.Add(match);
            _dbContext.SaveChanges();

            var multiPlayerList = new List<MultiPlayerMatch>();
      
            foreach (var player in payload.Players)
            {
                var currentPlayer = _dbContext.Ratings.FirstOrDefault(p => p.PlayerId == player.PlayerId && p.GameId == payload.GameId);
                //Player never played this game before
                if (currentPlayer == null)
                {
                    currentPlayer = new Rating {PlayerId = player.PlayerId, Score = 2400, GameId = payload.GameId, LastUpdateDate = DateTime.Now};
                    _dbContext.Ratings.Add(currentPlayer);
                    _dbContext.SaveChanges();
                }
                if (player.IsWinner)
                {
                    winningTeam.Add(currentPlayer);
                    winningTeamScore += currentPlayer.Score;
                }
                else
                {
                    losingTeam.Add(currentPlayer);
                    losingTeamScore += currentPlayer.Score;
                }

                var multiPlayObject = new MultiPlayerMatch()
                {
                    MatchId = match.Id,
                    PlayerId = player.PlayerId,
                    IsWinner = player.IsWinner
                };
                multiPlayObject.LastUpdateDate = DateTime.Now;
                multiPlayerList.Add(multiPlayObject);
            }
            
            //Average team score
            if (winningTeam.Any())
            {
                winningTeamScore = winningTeamScore / winningTeam.Count;
            }
            else
            {
                winningTeamScore = 0;
            }
            if (losingTeam.Any())
            {
                losingTeamScore = losingTeamScore / losingTeam.Count;
            }
            else
            {
                losingTeamScore = 0;
            }

            float playerScoreImpact=0;
            var kFactor = _dbContext.Games.First(g => g.Id == payload.GameId).KFactor;
            var newScores = _matchService.CalculateNewEloScore(Convert.ToDecimal(winningTeamScore), Convert.ToDecimal(losingTeamScore), payload.GameId, kFactor);
            float newWinningEloScore = float.Parse(newScores.WinningNewEloScore.ToString(),
                CultureInfo.InvariantCulture.NumberFormat);
            playerScoreImpact = newWinningEloScore - winningTeamScore;
            foreach (var player in winningTeam)
            {
                player.Score += playerScoreImpact;
                player.LastUpdateDate = DateTime.Now;
                var listPlayer = multiPlayerList.First(p => p.PlayerId == player.PlayerId);
                listPlayer.PlayerRating = player.Score;
                listPlayer.PointsImpact = playerScoreImpact;
            }
            foreach (var player in losingTeam)
            {
                player.Score -= playerScoreImpact;
                player.LastUpdateDate = DateTime.Now;
                var listPlayer = multiPlayerList.First(p => p.PlayerId == player.PlayerId);
                listPlayer.PlayerRating = player.Score;
                listPlayer.PointsImpact = playerScoreImpact;
            }

            _dbContext.Ratings.UpdateRange(winningTeam);
            _dbContext.Ratings.UpdateRange(losingTeam);
            await _dbContext.MultiPlayerMatches.AddRangeAsync(multiPlayerList);
            await _dbContext.SaveChangesAsync();
            return (int) Math.Round(playerScoreImpact); 
        }

        public IQueryable<RecentMatches> GetRecentMatches()
        {
            var matches = _dbContext.Matches
                .Include(g => g.Game)
                .OrderByDescending(m => m.Date)
                .Select(m => new RecentMatches()
                {
                    MatchId = m.Id,
                    GameId = m.GameId,
                    GameName = m.Game.Name,
                    GameDate = m.Date,
                    Players = (from multimatches in _dbContext.MultiPlayerMatches
                        where multimatches.MatchId == m.Id
                        select new RecentPlayer()
                        {
                            PlayerId = multimatches.PlayerId,
                            FullName = multimatches.Player.FullName,
                            IsWinner = multimatches.IsWinner,
                            Score = multimatches.PlayerRating,
                            PointsImpacted = Convert.ToInt32(multimatches.PointsImpact)
                        }).ToList()
                })
                .Take(10);
            //.GroupBy(m => m.MatchId);
        
            return matches;
        }
    }
}