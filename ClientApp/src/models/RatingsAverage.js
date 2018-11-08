import { Player } from "./Player";

export class RatingsAverage {
  constructor({
    id = undefined,
    player = [new Player()],
    games = 0,
    average = 0
  } = {}) {
    this.id = id;
    this.player = player[0];
    this.games = games;
    this.average = average;
  }
}
