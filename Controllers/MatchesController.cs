using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sclask.Models;

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

      if (matches == null)
      {
        return NotFound();
      }

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

      matchModel.Id = id;

      this._appContext.Update(matchModel);
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