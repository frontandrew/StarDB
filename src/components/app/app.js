
import React from 'react';

import './app.css';

import Api from '../../modules/api';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorMessage from '../error-message/error-message';
import ErrorButton from '../error-button/error-button';
import PeoplePage from '../people-page/people-page';

export default class App extends React.Component {

  swapi = new Api();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  componentDidCatch() {
    console.log('componentDidCatch()');
    this.setState({ hasError: true });
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

    if (this.state.hasError) {
      return (
        <ErrorMessage />
      );
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
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

        <div className="row mb2">
        <div className="col-md-6">
          <ItemList
            onItemSelected={this.onPersonSelected} 
            getData={this.swapi.getAllStarships}/>
        </div>
        <div className="col-md-6">
          <PersonDetails
            personId={this.state.selectedPerson} />
        </div>
      </div>

      </div>
    );
  }
};