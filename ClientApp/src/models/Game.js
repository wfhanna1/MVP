export class Game {
  constructor ({
    id = undefined,
    name = '',
    kFactor = 32
  } = {}) {
    this.id = id;
    this.name = name;
    this.kFactor = kFactor;
  }

  toJSON = () => {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      kFactor: this.kFactor
    })
  }
}