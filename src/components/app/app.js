
import React from 'react';

import './app.css';

import Api from '../../modules/api';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemDetails from '../item-details/item-details';
import Row from '../row/row';
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

    const { getPerson, getPersonImage, getStarship, getStarshipImage  } = this.swapi;

    const personDetails = (
      <ItemDetails
        itemId={4}
        getData={getPerson}
        getImageUrl={getPersonImage} />
    );

    const starshipDetails = (
      <ItemDetails
        itemId={9}
        getData={getStarship}
        getImageUrl={getStarshipImage} />
    );

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

          <Row left={personDetails} rigth={starshipDetails} />

        </div>
      </ErrorBoundry>
    );
  }
};