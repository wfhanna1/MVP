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

    [HttpGet("find")]
    public ActionResult<List<Player>> Search(string q)
    {
      if (q == null)
      {
        return new List<Player>();
      }
      q = q.ToLower();
      var results = this._appContext.Players
        .Where(p => p.EmailAddress.ToLower().Contains(q) || p.FullName.ToLower().Contains(q))
        .ToList();

      return results;
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Player playerModel)
    {
      var player = this._appContext.Players.Find(id);
      if (player == null)
      {
        return NotFound();
      }

      player.EmailAddress = playerModel.EmailAddress;
      player.FullName = playerModel.FullName;
      player.ProfilePhoto = playerModel.ProfilePhoto;

      this._appContext.Update(player);
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

      var playerExists = _appContext.Players.Where(p => p.EmailAddress == player.EmailAddress).FirstOrDefault();
      if (playerExists == null)
      {
        _appContext.Add(player);
        _appContext.SaveChanges();
        return CreatedAtRoute("GetPlayer", new { id = player.Id }, player);
      }

      return BadRequest("Player already exists");
    }
  }
}