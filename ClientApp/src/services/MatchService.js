import { Match } from "../models/Match";

export class MatchService {
  read = async (id = 0) => {
    const url = `/api/matches${id === 0 ? "" : "/" + id}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new Match(g));
    } catch (e) {
      throw e;
    }
  };

  readRecentMatches = async () => {
    const url = `/api/matches/recent`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new Match(g));
    } catch (e) {
      throw e;
    }
  };

  create = async (match = new Match()) => {
    const url = "/api/matches";
    const options = {
      method: "POST",
      body: match.toJSON(),
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
