using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sclask.Models
{
  public class Player
  {
    public int Id { get; set; }
    [StringLength(255)]
    [Required]
    public string FullName { get; set; }
    [EmailAddress]
    [Required]
    public string EmailAddress { get; set; }
    [Url]
    public string ProfilePhoto { get; set; }
  }
}