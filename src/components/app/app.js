
import React from 'react';

import './app.css';

import Api from '../../modules/api';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import PeoplePage from '../people-page/people-page';
import ErrorBoundry from '../error-boundry/error-boundry';
import ErrorButton from '../error-button/error-button';

export default class App extends React.Component {

  swapi = new Api();

  state = {
    showRandomPlanet: true
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return state.showRandomPlanet = !state.showRandomPlanet
    });
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    })
  }

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          {planet}

          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Planet
        </button>
          <ErrorButton />

          <PeoplePage />

          {/* <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapi.getAllStarships}
              renderItem={({ name, length, model }) => `${name} (${length} metres, ${model})`} />
          </div>
          <div className="col-md-6">
            <PersonDetails
              personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapi.getAllPlanets}
              renderItem={({ name, diameter, population }) => `${name} (${diameter} km, ${population} persons)`} />
          </div>
          <div className="col-md-6">
            <PersonDetails
              personId={this.state.selectedPerson} />
          </div>
        </div> */}

        </div>
      </ErrorBoundry>
    );
  }
};