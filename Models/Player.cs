using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sclask.Models
{
  public class Player
  {
    public int Id { get; set; }
    [StringLength(255)]
    public string FullName { get; set; }
    [EmailAddress]
    public string EmailAddress { get; set; }
  }
}