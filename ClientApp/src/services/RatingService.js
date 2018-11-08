import { Rating } from "../models/Rating";
import { RatingsAverage } from "../models/RatingsAverage";

export class RatingService {
  read = async (id = 0) => {
    const url = `/api/ratings${id === 0 ? "" : "/" + id}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new Rating(g));
    } catch (e) {
      throw e;
    }
  };

  readTopPlayers = async () => {
    const url = `/api/ratings/topPlayers`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new RatingsAverage(g));
    } catch (e) {
      throw e;
    }
  };

  create = async (rating = new Rating()) => {
    const url = "/api/ratings";
    const options = {
      method: "POST",
      body: rating.toJSON(),
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

  findByGame = async (gameId = 0) => {
    const url = `/api/ratings/find?gameId=${gameId}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.map(g => new Rating(g));
    } catch (e) {
      throw e;
    }
  };
}
