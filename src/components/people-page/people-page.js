import React from 'react';

import './people-page.css';

import Api from '../../modules/api';
import ItemDetails, { Record } from '../item-details/item-details';
import ItemList from '../item-list/item-list';
import ErrorBoundry from '../error-boundry/error-boundry';
import Row from '../row/row';

export default class PeoplePage extends React.Component {

  swapi = new Api();

  state = {
    selectedPerson: null
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson })
  }

  render() {
    const peopleList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapi.getAllPeople}
        renderItem={
          ({ name, birthYear, gender }) => {
            return `${name} (${gender}, ${birthYear})`
          }
        } />
    );

    const { getPerson, getPersonImage } = this.swapi;

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedPerson}
          getData={getPerson}
          getImageUrl={getPersonImage} >

            <Record field="gender" label="Gender" />
            <Record field="birthYear" label="Birth year" />
            <Record field="height" label="Height" />
            <Record field="eyeColor" label="Eye color" />

        </ItemDetails>
      </ErrorBoundry>
    );

    const starshipList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapi.getAllStarships}
        renderItem={({ name, length, model }) => {
          return `${name} (${length} metres, ${model})`
        }} />
    );

    return (
      <Row left={peopleList} rigth={starshipList} />
    );
  }
}