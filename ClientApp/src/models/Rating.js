import { Player } from "./Player";

export class Rating {
  constructor({
    id = undefined,
    player = new Player(),
    playerId = undefined,
    gameId = undefined,
    score = 2400
  } = {}) {
    this.id = id;
    this.player = player;
    this.playerId = playerId;
    this.gameId = gameId;
    this.score = score;
  }

  toJSON = () => {
    return JSON.stringify({
      id: this.id,
      playerId: this.playerId,
      gameId: this.gameId,
      score: this.score
    });
  };
}
