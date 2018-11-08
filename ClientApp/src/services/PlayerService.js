import { Player } from "../models/Player";

export class PlayerService {
  read = async (id = 0) => {
    const url = `/api/players${id === 0 ? "" : "/" + id}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new Player(g));
    } catch (e) {
      throw e;
    }
  };

  create = async (player = new Player()) => {
    const url = "/api/players";
    const options = {
      method: "POST",
      body: player.toJSON(),
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

  find = async (query = "") => {
    const url = `/api/players/find?q=${query}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new Player(g));
    } catch (e) {
      throw e;
    }
  };
}
