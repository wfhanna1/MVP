using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sclask.Models
{
  public class Match
  {
    public int Id { get; set; }
    [Required]
    public int PlayerAId { get; set; }
    public Player PlayerA { get; set; }
    [Required]
    public int PlayerBId { get; set; }
    public Player PlayerB { get; set; }
    public float PlayerAPrediction { get; set; }
    public float PlayerBPredicition { get; set; }
    [Required]
    public int WinnerId { get; set; }
    public Player Winner { get; set; }
    [Required]
    public int GameId { get; set; }
    public Game Game { get; set; }
    public DateTime Date { get; set; }
  }
}