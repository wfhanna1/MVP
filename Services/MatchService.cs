using System;
using System.Collections.Generic;
using System.Linq;
using Kezyma.EloRating;
using sclask.DTO;
using sclask.Models;

namespace sclask.Services
{
  public class MatchServices : IMatchService
  {
    private readonly SclaskDbContext _dbContext;

    public MatchServices(SclaskDbContext dbContext)
    {
      _dbContext = dbContext;
    }
    public Match SetPredicitions(Match match, List<Rating> ratings)
    {
//      var playerARating = ratings.Find(r => r.PlayerId == match.PlayerAId);
//      var playerBRating = ratings.Find(r => r.PlayerId == match.PlayerBId);
//      var prediction = SetPredictionsHelper(playerARating, playerBRating);
//      match.PlayerAPrediction = prediction.PlayerAPrediction;
//      match.PlayerBPredicition = prediction.PlayerBPrediction;
      return match;
    }

    public List<Rating> UpdateRatings(Match match, List<Rating> ratings)
    {
//      var playerARating = ratings.Find(r => r.PlayerId == match.PlayerAId);
//      float playerAScore = playerARating != null ? playerARating.Score : 2400;
//      var playerBRating = ratings.Find(r => r.PlayerId == match.PlayerBId);
//      float playerBScore = playerBRating != null ? playerBRating.Score : 2400;
//
//      float playerAPoints = match.WinnerId == match.PlayerAId ? 1 : 0;
//      float playerBPoints = match.WinnerId == match.PlayerBId ? 1 : 0;
//
//      Rating playerAUpdatedRating = new Rating()
//      {
//        PlayerId = match.PlayerAId,
//        GameId = match.GameId,
//        Score = playerAScore + match.Game.KFactor * (playerAPoints - match.PlayerAPrediction)
//      };
//
//      Rating playerBUpdatedRating = new Rating()
//      {
//        PlayerId = match.PlayerBId,
//        GameId = match.GameId,
//        Score = playerBScore + match.Game.KFactor * (playerBPoints - match.PlayerBPredicition)
//      };
//
//      return new List<Rating>() {
//        playerAUpdatedRating,
//        playerBUpdatedRating
//      };
        return new List<Rating>();
    }

    public (decimal WinningNewEloScore, decimal LosingNewEloScore) CalculateNewEloScore(decimal winningScore, decimal losingScore, int gameId, int kFactor)
    {
      var newElo = EloCalculator.CalculateElo( winningScore,  losingScore, Convert.ToDecimal(EloCalculator.WIN), Convert.ToDecimal(EloCalculator.LOSE),
       kFactor, kFactor);

     return (newElo[0], newElo[1]);
    }

    private (float PlayerAPrediction, float PlayerBPrediction) SetPredictionsHelper(Rating playerARating, Rating playerBRating)
    {
      float playerAScore = playerARating?.Score ?? 2400;
      float playerBScore = playerBRating?.Score ?? 2400;

      float playerAT = (float)Math.Pow(10, playerAScore / 400);
      float playerBT = (float)Math.Pow(10, playerBScore / 400);

      var playerAPrediction = (playerAT / (playerAT + playerBT));
      var playerBPredicition = (playerBT / (playerBT + playerAT));

      return (playerAPrediction, playerBPredicition);
    }
  }
}