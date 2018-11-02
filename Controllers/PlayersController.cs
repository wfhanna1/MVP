using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sclask.Models;

namespace sclask.Controllers
{
  [Route("api/[controller]")]
  public class PlayersController : Controller
  {
    private readonly SclaskDbContext _appContext;

    public PlayersController(SclaskDbContext appDbContext)
    {
      this._appContext = appDbContext;
    }

    [HttpGet]
    public ActionResult<ICollection<Player>> Index()
    {
      var players = this._appContext.Players.ToList();

      if (players == null)
      {
        return NotFound();
      }

      return Ok(players);
    }

    [HttpGet("{id}", Name = "GetPlayer")]
    public ActionResult<Player> GetPlayer(int id)
    {
      Player player = this._appContext.Players
        .Where(d => d.Id == id)
        .FirstOrDefault();

      if (player == null)
      {
        return NotFound();
      }

      return player;
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Player playerModel)
    {
      var player = this._appContext.Players.Find(id);
      if (player == null)
      {
        return NotFound();
      }

      playerModel.Id = id;

      this._appContext.Update(playerModel);
      this._appContext.SaveChanges();

      return NoContent();
    }

    [HttpPost]
    public IActionResult Create([FromBody] Player player)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      this._appContext.Add(player);
      this._appContext.SaveChanges();

      return CreatedAtRoute("GetPlayer", new { id = player.Id }, player);
    }
  }
}