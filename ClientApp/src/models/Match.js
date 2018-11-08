import { Game } from "./Game";
import { Player } from "./Player";

export class Match {
  constructor({
    id = undefined,
    playerA = new Player(),
    playerAId = undefined,
    playerB = new Player(),
    playerBId = undefined,
    winner = new Player(),
    winnerId = undefined,
    playerAPredicition = undefined,
    playerBPredicition = undefined,
    game = new Game(),
    gameId = undefined,
    date = new Date().toString()
  } = {}) {
    this.id = id;
    this.playerA = playerA;
    this.playerAId = playerAId;
    this.playerB = playerB;
    this.playerBId = playerBId;
    this.winner = winner;
    this.winnerId = winnerId;
    this.playerAPredicition = playerAPredicition;
    this.playerBPredicition = playerBPredicition;
    this.game = game;
    this.gameId = gameId;
    this.date = new Date(date);
  }

  toJSON = () => {
    return JSON.stringify({
      id: this.id,
      playerAId: this.playerAId,
      playerBId: this.playerBId,
      winnerId: this.winnerId,
      playerAPredicition: this.playerAPredicition,
      playerBPredicition: this.playerBPredicition,
      gameId: this.gameId,
      date: this.date
    });
  };
}
