using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task RecordMultiPlayerGame(MultiPlayerMatchRequest payload)
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

            var multiPlayerTable = new List<MultiPlayerMatch>();
      
            foreach (var player in payload.Players)
            {
                var currentPlayer = _dbContext.Ratings.FirstOrDefault(p => p.PlayerId == player.PlayerId && p.GameId == payload.GameId);
                //Player never played this game before
                if (currentPlayer == null)
                {
                    currentPlayer = new Rating {PlayerId = player.PlayerId, Score = 2400, GameId = payload.GameId};
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
                multiPlayerTable.Add(multiPlayObject);
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

            var kFactor = _dbContext.Games.First(g => g.Id == payload.GameId).KFactor;
            var newScores = _matchService.CalculateNewEloScore(Convert.ToDecimal(winningTeamScore), Convert.ToDecimal(losingTeamScore), payload.GameId, kFactor);
            foreach (var player in winningTeam)
            {
                var pointsDifference = Math.Abs(float.Parse(newScores.WinningNewEloScore.ToString(), CultureInfo.InvariantCulture.NumberFormat) - player.Score);
                player.Score += pointsDifference;
            }
            foreach (var player in losingTeam)
            {
                var pointsDifference = Math.Abs(player.Score - float.Parse(newScores.LosingNewEloScore.ToString(), CultureInfo.InvariantCulture.NumberFormat));
                player.Score -= pointsDifference;
            }

            await _dbContext.MultiPlayerMatches.AddRangeAsync(multiPlayerTable);
            await _dbContext.SaveChangesAsync();
        }
    }
}