using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Design.Internal;

namespace sclask.Models
{
    public class MultiPlayerMatch
    {
        public int MultiPlayerMatchId { get; set; }
            
        [Required]
        public int MatchId { get; set; }

        [Required]
        public int PlayerId { get; set; }
        
        public bool IsWinner { get; set; }
        
        public Match Match { get; set; }
    }
}