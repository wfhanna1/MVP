using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sclask.Models
{
  public class Rating
  {
    public int Id { get; set; }
    public Player Player { get; set; }
    public int PlayerId { get; set; }
    public Game Game { get; set; }
    public int GameId { get; set; }
    public float Score { get; set; }
    
    public DateTime LastUpdateDate { get; set; }
  }
}