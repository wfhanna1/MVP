using System.Collections.Generic;

namespace sclask.DTO
{
    public class MultiPlayerMatchRequest
    {
        public ICollection<MultiPlayer> Players { get; set; }
        
        public int GameId { get; set; }
    }
}