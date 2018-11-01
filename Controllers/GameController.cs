using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sclask.Models;

namespace sclask.Controllers
{
  [Route("api/[controller]")]
  public class GamesController : Controller
  {
    private readonly SclaskDbContext _appContext;

    public GamesController(SclaskDbContext appDbContext)
    {
      this._appContext = appDbContext;
    }

    [HttpGet]
    public ActionResult<ICollection<Player>> Index()
    {
      var games = this._appContext.Games.ToList();

      if (games == null)
      {
        return NotFound();
      }

      return Ok(games);
    }

    [HttpGet("{id}", Name = "GetGame")]
    public ActionResult<Game> GetGame(int id)
    {
      Game game = this._appContext.Games
        .Where(d => d.Id == id)
        .FirstOrDefault();

      if (game == null)
      {
        return NotFound();
      }

      return game;
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Game gameModel)
    {
      var game = this._appContext.Games.Find(id);
      if (game == null)
      {
        return NotFound();
      }

      gameModel.Id = id;

      this._appContext.Update(gameModel);
      this._appContext.SaveChanges();

      return NoContent();
    }

    [HttpPost]
    public IActionResult Create([FromBody] Game game)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      try 
      {
        this._appContext.Add(game);
        this._appContext.SaveChanges();
        return CreatedAtRoute("GetGame", new { id = game.Id }, game);
      }
      catch (Exception e)
      {
        return BadRequest();
      }
    }
  }
}