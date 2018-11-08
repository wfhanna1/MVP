import { Game } from "../models/Game";

export class GameService {
  read = async (id = 0) => {
    const url = `/api/games${id === 0 ? "" : "/" + id}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new Game(g));
    } catch (e) {
      throw e;
    }
  };

  create = async (game = new Game()) => {
    const url = "/api/games";
    const options = {
      method: "POST",
      body: game.toJSON(),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (e) {
      throw e;
    }
  };
}
