using System;
using System.Collections.Generic;

namespace sclask.DTO
{
    public class RecentMatches
    {
        public int MatchId { get; set; }
        public int GameId { get; set; }
        public string GameName { get; set; }
        public DateTime GameDate { get; set; }
        public List<RecentPlayer> Players { get; set; }
    }

    public class RecentPlayer
    {
        public int PlayerId { get; set; }
        public string FullName { get; set; }
        public bool IsWinner { get; set; }
    }
}