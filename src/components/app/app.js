
import React from 'react';

import './app.css';

import { ApiProvider } from '../api-context/api-context';

import Api from '../../modules/api';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import ItemDetails, { Record } from '../item-details/item-details';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';
import ErrorButton from '../error-button/error-button';

import {
  PersonDetails, PlanetDetails, StarshipDetails,
  PersonList, PlanetList, StarshipList
} from '../sw-components';

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
        <ApiProvider value={this.swapi}>
          <div className="stardb-app">

            <Header />
            {planet}
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Planet
            </button>

            <ErrorButton />

            <PersonDetails itemId={22} />
            <PlanetDetails itemId={3} />
            <StarshipDetails itemId={11} />

            <PersonList />
            <PlanetList />
            <StarshipList />

          </div>
        </ApiProvider>
      </ErrorBoundry>
    );
  }
};