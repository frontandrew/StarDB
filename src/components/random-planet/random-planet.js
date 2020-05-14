import React from 'react';
import Api from '../../modules/api'

import './random-planet.css';

import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';
import ErrorBoundry from '../error-boundry/error-boundry';

export default class RandomPlanet extends React.Component {

  swapi = new Api();

  state = {
    planet: {},
    loading: true,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.swapi.abortRequest();
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
      <ErrorBoundry>
        <div className="random-planet jumbotron">
          {spiner}
          {planetVeiw}
          {errMessage}
        </div>
      </ErrorBoundry>
    );
  }
}

const PlanetVeiw = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image" alt="planet view"
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