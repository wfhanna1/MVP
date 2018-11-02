using System.ComponentModel.DataAnnotations;

namespace sclask.Models
{
  public class Game
  {
    public int Id { get; set; }
    [Required]
    [StringLength(255)]
    public string Name { get; set; }
    [Required]
    public int KFactor { get; set; }
  }
}