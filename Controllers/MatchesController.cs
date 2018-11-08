using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sclask.Models;
using sclask.Services;

namespace sclask.Controllers
{
  [Route("api/[controller]")]
  public class MatchesController : Controller
  {
    private readonly SclaskDbContext _appContext;

    public MatchesController(SclaskDbContext appDbContext)
    {
      this._appContext = appDbContext;
    }

    [HttpGet]
    public ActionResult<ICollection<Match>> Index()
    {
      var matches = this._appContext.Matches.ToList();

      return Ok(matches);
    }

    [HttpGet("recent")]
    public ActionResult<ICollection<Match>> Recent()
    {
      var matches = this._appContext.Matches
        .Include(r => r.PlayerA)
        .Include(r => r.PlayerB)
        .Include(r => r.Game)
        .OrderByDescending(r => r.Date)
        .Take(5)
        .ToList();

      return Ok(matches);
    }

    [HttpGet("{id}", Name = "GetMatch")]
    public ActionResult<Match> GetMatch(int id)
    {
      Match match = this._appContext.Matches
        .Where(d => d.Id == id)
        .FirstOrDefault();

      if (match == null)
      {
        return NotFound();
      }

      return match;
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Match matchModel)
    {
      var match = this._appContext.Matches.Find(id);
      if (match == null)
      {
        return NotFound();
      }

      match.PlayerAId = matchModel.PlayerAId;
      match.PlayerBId = matchModel.PlayerBId;
      match.WinnerId = matchModel.WinnerId;
      match.PlayerAPrediction = matchModel.PlayerAPrediction;
      match.PlayerBPredicition = matchModel.PlayerBPredicition;

      this._appContext.Update(match);
      this._appContext.SaveChanges();

      return NoContent();
    }

    [HttpPost]
    public IActionResult Create([FromBody] Match match)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      match.Game = this._appContext.Games.Find(match.GameId);
      if (match.Game == null)
      {
        return BadRequest();
      }

      match.PlayerA = this._appContext.Players.Find(match.PlayerAId);
      if (match.PlayerA == null)
      {
        return BadRequest();
      }

      match.PlayerB = this._appContext.Players.Find(match.PlayerBId);
      if (match.PlayerB == null)
      {
        return BadRequest();
      }

      if (match.WinnerId != match.PlayerAId && match.WinnerId != match.PlayerBId)
      {
        return BadRequest();
      }

      match.Date = DateTime.Now;

      var ratings = this._appContext.Ratings.Where(r => r.PlayerId == match.PlayerAId || r.PlayerId == match.PlayerBId).ToList();

      match = MatchServices.SetPredicitions(match, ratings);
      var updatedRatings = MatchServices.UpdateRatings(match, ratings);

      var playerARating = ratings.Find(r => r.PlayerId == match.PlayerAId);
      var playerAUpdatedRating = updatedRatings.Find(r => r.PlayerId == match.PlayerAId);
      if (playerARating != null)
      {
        playerARating.Score = playerAUpdatedRating.Score;
        this._appContext.Ratings.Update(playerARating);
      }
      else
      {
        this._appContext.Ratings.Add(playerAUpdatedRating);
      }

      var playerBRating = ratings.Find(r => r.PlayerId == match.PlayerBId);
      var playerBUpdatedRating = updatedRatings.Find(r => r.PlayerId == match.PlayerBId);
      if (playerBRating != null)
      {
        playerBRating.Score = playerBUpdatedRating.Score;
        this._appContext.Ratings.Update(playerBRating);
      }
      else
      {
        this._appContext.Ratings.Add(playerBUpdatedRating);
      }

      try
      {
        this._appContext.Add(match);
        this._appContext.SaveChanges();
        return CreatedAtRoute("GetMatch", new { id = match.Id }, match);
      }
      catch (Exception e)
      {
        return BadRequest();
      }
    }
  }
}