
import React from 'react';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorMessage from '../error-message/error-message';
import ErrorButton from '../error-button/error-button';

import './app.css';
import PeoplePage from '../people-page/people-page';

export default class App extends React.Component {

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

      </div>
    );
  }
};