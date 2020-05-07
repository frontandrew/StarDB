export default class Api {

  _apiUrl = 'https://swapi.dev/api/';

  controller = new AbortController();

  abortRequest() {
    this.controller.abort();
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiUrl}${url}`, { signal: this.controller.signal });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json()
  }

  getAllPeople = async () => {
    const res = await this.getResource(`people/`)
    return res.results.map(this._transformRerson);
  }

  getPerson = async (id) => {
    const person = await this.getResource(`people/${id}/`)
    return this._transformRerson(person);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`planets/`)
    return res.results.map(this._transformPlanet);
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`planets/${id}/`);
    return this._transformPlanet(planet)
  }

  getAllStarships = async () => {
    const res = await this.getResource(`starships/`)
    return res.results.map(this._transformStarship);
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`starships/${id}/`)
    return this._transformStarship(starship);
  }

  _extractId = (item) => {
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