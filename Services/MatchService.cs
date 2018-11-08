using System;
using System.Collections.Generic;
using System.Linq;
using sclask.Models;

namespace sclask.Services
{
  public static class MatchServices
  {
    public static Match SetPredicitions(Match match, List<Rating> ratings)
    {
      var playerARating = ratings.Find(r => r.PlayerId == match.PlayerAId);
      float playerAScore = playerARating != null ? playerARating.Score : 2400;
      var playerBRating = ratings.Find(r => r.PlayerId == match.PlayerBId);
      float playerBScore = playerBRating != null ? playerBRating.Score : 2400;

      float playerAT = (float)Math.Pow(10, playerAScore / 400);
      float playerBT = (float)Math.Pow(10, playerBScore / 400);

      match.PlayerAPrediction = (playerAT / (playerAT + playerBT));
      match.PlayerBPredicition = (playerBT / (playerBT + playerAT));

      return match;
    }

    public static List<Rating> UpdateRatings(Match match, List<Rating> ratings)
    {
      var playerARating = ratings.Find(r => r.PlayerId == match.PlayerAId);
      float playerAScore = playerARating != null ? playerARating.Score : 2400;
      var playerBRating = ratings.Find(r => r.PlayerId == match.PlayerBId);
      float playerBScore = playerBRating != null ? playerBRating.Score : 2400;

      float playerAPoints = match.WinnerId == match.PlayerAId ? 1 : 0;
      float playerBPoints = match.WinnerId == match.PlayerBId ? 1 : 0;

      Rating playerAUpdatedRating = new Rating()
      {
        PlayerId = match.PlayerAId,
        GameId = match.GameId,
        Score = playerAScore + match.Game.KFactor * (playerAPoints - match.PlayerAPrediction)
      };

      Rating playerBUpdatedRating = new Rating()
      {
        PlayerId = match.PlayerBId,
        GameId = match.GameId,
        Score = playerBScore + match.Game.KFactor * (playerBPoints - match.PlayerBPredicition)
      };

      return new List<Rating>() {
        playerAUpdatedRating,
        playerBUpdatedRating
      };
    }
  }
}