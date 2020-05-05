import React from 'react';
import Api from '../../modules/api'

import './random-planet.css';

import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';

export default class RandomPlanet extends React.Component {

  swapi = new Api();

  state = {
    planet: {},
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  }

  updatePlanet = () => {
    console.log('update');
    const id = Math.floor(Math.random() * 20) + 2;
    this.swapi.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errMessage = error ? <ErrorMessage /> : null;
    const spiner = loading ? <Spiner /> : null;
    const planetVeiw = hasData ? <PlanetVeiw planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spiner}
        {planetVeiw}
        {errMessage}        
      </div>
    );
  }
}

const PlanetVeiw = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image" alt="planet image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}