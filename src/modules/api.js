export default class Api {

  _apiUrl = 'https://swapi.dev/api/';

  async getResource(url) {
    const res = await fetch(`${this._apiUrl}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json()
  }

  async getAllPeople() {
    const res = await this.getResource(`people/`)
    return res.results.map(this._transformRerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`people/${id}/`)
    return this._transformRerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`planets/`)
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`planets/${id}/`);
    return this._transformPlanet(planet)
  }

  async getAllStarships() {
    const res = await this.getResource(`starships/`)
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`starships/${id}/`)
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegexp = /\/([0-9]+)\/$/;
    return item.url.match(idRegexp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starships) => {
    return {
      id: this._extractId(starships),
      name: starships.name,
      model: starships.model,
      manufacturer: starships.manufacturer,
      costInCredits: starships.cost_in_credits,
      length: starships.length,
      pessengers: starships.pessengers,
      cargoCapacity: starships.cargo_capacity,
    }
  }

  _transformRerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      height: person.height,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    }
  }

}