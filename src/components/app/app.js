import React from 'react';

import './app.css';

import { ApiProvider } from '../api-context/api-context';
import Api from '../../modules/api';
import TestApi from '../../modules/test-api';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';
import ErrorBoundry from '../error-boundry/error-boundry';

export default class App extends React.Component {

  state = {
    swapi: new Api(),
  }

  onApiChange = () => {
    this.setState(({ swapi }) => {
      const Service = swapi instanceof Api ? TestApi : Api;
      console.log('switched to: ' + Service.name)

      return { swapi: new Service() }
    });
  }

  render() {
    return (
      <ErrorBoundry>
        <ApiProvider value={this.state.swapi}>
          <div className="stardb-app">

            <Header onApiChange={this.onApiChange} />
            <RandomPlanet />
            <PeoplePage />
            <StarshipPage />
            <PlanetPage />

          </div>
        </ApiProvider>
      </ErrorBoundry>
    );
  }
};