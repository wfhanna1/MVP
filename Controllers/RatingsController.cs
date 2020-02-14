using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sclask.Models;

namespace sclask.Controllers
{
    [Route("api/[controller]")]
    public class RatingsController : Controller
    {
        private readonly SclaskDbContext _appContext;

        public RatingsController(SclaskDbContext appDbContext)
        {
            this._appContext = appDbContext;
        }

        [HttpGet]
        public ActionResult<ICollection<Rating>> Index()
        {
            var ratings = this._appContext.Ratings.ToList();

            return Ok(ratings);
        }

        [HttpGet("topPlayers")]
        public ActionResult<ICollection<Rating>> TopRatingsByPlayer()
        {
            var ratings = this._appContext.Ratings
              .Include(r => r.Player)
              .GroupBy(r => new { PlayerId = r.PlayerId })
              .Select(
                g => new
                {
                    Average = g.Average(p => p.Score),
                    Id = g.Key.PlayerId,
                    Player = g.Select(p => p.Player),
                    Games = _appContext.MultiPlayerMatches.Count(t => t.PlayerId == g.Key.PlayerId)
                }
              )
              .Where(q => q.Games >= 10)
              .OrderByDescending(q => q.Average)
              .Take(20)
              .ToList();

            return Ok(ratings);
        }

        [HttpGet("bottomPlayers")]
        public ActionResult<ICollection<Rating>> BottomRatingsByPlayer()
        {
            var ratings = this._appContext.Ratings
              .Include(r => r.Player)
              .GroupBy(r => new { PlayerId = r.PlayerId })
              .Select(
                g => new
                {
                    Average = g.Average(p => p.Score),
                    Id = g.Key.PlayerId,
                    Player = g.Select(p => p.Player),
                    Games = _appContext.MultiPlayerMatches.Count(t => t.PlayerId == g.Key.PlayerId)
                }
              )
              .OrderBy(g => g.Average)
              .Take(10)
              .ToList();

            return Ok(ratings);
        }

        [HttpGet("{id}", Name = "GetRating")]
        public ActionResult<Rating> GetRating(int id)
        {
            Rating rating = this._appContext.Ratings
              .Where(d => d.PlayerId == id)
              .OrderByDescending(d => d.LastUpdateDate)
              .FirstOrDefault();

            if (rating == null)
            {
                return NotFound();
            }

            return rating;
        }

        [HttpGet("find")]
        public ActionResult<List<Rating>> Search(int gameId)
        {
            var results = this._appContext.Ratings
              .Where(r => r.GameId == gameId)
              .ToList();

            return results;
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Rating ratingModel)
        {
            var rating = this._appContext.Ratings.Find(id);
            if (rating == null)
            {
                return NotFound();
            }

            rating.GameId = ratingModel.GameId;
            rating.PlayerId = ratingModel.PlayerId;
            rating.Score = ratingModel.Score;

            this._appContext.Update(rating);
            this._appContext.SaveChanges();

            return NoContent();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Rating rating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                this._appContext.Add(rating);
                this._appContext.SaveChanges();
                return CreatedAtRoute("GetRating", new { id = rating.Id }, rating);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}