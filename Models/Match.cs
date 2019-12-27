using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sclask.Models
{
  public class Match
  {
    public int Id { get; set; }
    
    [Required]
    public int GameId { get; set; }
    public Game Game { get; set; }
    public DateTime Date { get; set; }
  }
}