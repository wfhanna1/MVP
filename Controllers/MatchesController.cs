using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sclask.DTO;
using sclask.Managers;
using sclask.Models;
using sclask.Services;

namespace sclask.Controllers
{
  [Route("api/[controller]")]
  public class MatchesController : Controller
  {
    private readonly SclaskDbContext _appContext;
    private readonly IMatchesManager _matchesManager;
    private readonly IMatchService _matchService;

    public MatchesController(SclaskDbContext appDbContext, IMatchesManager matchesManager, IMatchService matchService)
    {
      _appContext = appDbContext;
      _matchesManager = matchesManager;
      _matchService = matchService;
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
      var matches = _appContext.MultiPlayerMatches
        .Include(r => r.Player)
        .Include(r => r.Match)
        .Include(r => r.Match.Game)
        .OrderByDescending(r => r.Match.Date)
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

//    [HttpPut("{id}")]
//    public IActionResult Update(int id, [FromBody] Match matchModel)
//    {
//      var match = this._appContext.Matches.Find(id);
//      if (match == null)
//      {
//        return NotFound();
//      }
//
//      match.PlayerAId = matchModel.PlayerAId;
//      match.PlayerBId = matchModel.PlayerBId;
//      match.WinnerId = matchModel.WinnerId;
//      match.PlayerAPrediction = matchModel.PlayerAPrediction;
//      match.PlayerBPredicition = matchModel.PlayerBPredicition;
//
//      this._appContext.Update(match);
//      this._appContext.SaveChanges();
//
//      return NoContent();
//    }
//
//    [HttpPost]
//    public IActionResult Create([FromBody] Match match)
//    {
//      if (!ModelState.IsValid)
//      {
//        return BadRequest();
//      }
//
//      match.Game = this._appContext.Games.Find(match.GameId);
//      if (match.Game == null)
//      {
//        return BadRequest();
//      }
//
//      match.PlayerA = this._appContext.Players.Find(match.PlayerAId);
//      if (match.PlayerA == null)
//      {
//        return BadRequest();
//      }
//
//      match.PlayerB = this._appContext.Players.Find(match.PlayerBId);
//      if (match.PlayerB == null)
//      {
//        return BadRequest();
//      }
//
//      if (match.WinnerId != match.PlayerAId && match.WinnerId != match.PlayerBId)
//      {
//        return BadRequest();
//      }
//
//      match.Date = DateTime.Now;
//
//      var ratings = this._appContext.Ratings.Where(r => r.PlayerId == match.PlayerAId || r.PlayerId == match.PlayerBId).ToList();
//
//      match = _matchService.SetPredicitions(match, ratings);
//      var updatedRatings = _matchService.UpdateRatings(match, ratings);
//
//      var playerARating = ratings.Find(r => r.PlayerId == match.PlayerAId && r.GameId == match.GameId);
//      var playerAUpdatedRating = updatedRatings.Find(r => r.PlayerId == match.PlayerAId);
//      if (playerARating != null)
//      {
//        playerARating.Score = playerAUpdatedRating.Score;
//        this._appContext.Ratings.Update(playerARating);
//      }
//      else
//      {
//        this._appContext.Ratings.Add(playerAUpdatedRating);
//      }
//
//      var playerBRating = ratings.Find(r => r.PlayerId == match.PlayerBId && r.GameId == match.GameId);
//      var playerBUpdatedRating = updatedRatings.Find(r => r.PlayerId == match.PlayerBId);
//      if (playerBRating != null)
//      {
//        playerBRating.Score = playerBUpdatedRating.Score;
//        this._appContext.Ratings.Update(playerBRating);
//      }
//      else
//      {
//        this._appContext.Ratings.Add(playerBUpdatedRating);
//      }
//
//      try
//      {
//        this._appContext.Add(match);
//        this._appContext.SaveChanges();
//        return CreatedAtRoute("GetMatch", new { id = match.Id }, match);
//      }
//      catch (Exception e)
//      {
//        return BadRequest();
//      }
//    }

    [Route("multiplayer")]
    [HttpPost]
    public async Task<IActionResult> RecordMultiPlayerGame([FromBody] MultiPlayerMatchRequest payload)
    {
      if (!ModelState.IsValid || payload == null)
      {
        return BadRequest("Unacceptable payload");
      }

      var validPayload = _matchesManager.ValidatePayload(payload);
      if(validPayload)
      {
        var scoreImpact = await _matchesManager.RecordMultiPlayerGame(payload);
        return (IActionResult) Accepted(scoreImpact);
      }
      return BadRequest(false);
    }
  }
}