
import React from 'react';

import './app.css';

import Api from '../../modules/api';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
//import PeoplePage from '../people-page/people-page';
import ItemList from '../item-list/item-list';
import ItemDetails, { Record } from '../item-details/item-details';
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

    const { getAllPeople, getPerson, getPersonImage, getAllStarships, getStarship, getStarshipImage } = this.swapi;

    const personsList = (
      <ItemList
        onItemSelected={() => { }}
        getData={getAllPeople} >

        {({ name }) => <span>{name}</span>}
      </ItemList>
    );

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage} >

        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth year" />
        <Record field="height" label="Height" />
        <Record field="eyeColor" label="Eye color" />

      </ItemDetails>
    );

    const starshipsList = (
      <ItemList
        onItemSelected={() => { }}
        getData={getAllStarships} >

        {({ name }) => <span>{name}</span>}
      </ItemList>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={9}
        getData={getStarship}
        getImageUrl={getStarshipImage} >

        <Record field="model" label="Model" />
        <Record field="costInCredits" label="Cost" />
        <Record field="length" label="Length" />
        <Record field="passengers" label="Passengers" />

      </ItemDetails>
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


          <Row left={starshipsList} rigth={starshipDetails} />
          <Row left={personsList} rigth={personDetails} />

        </div>
      </ErrorBoundry>
    );
  }
};