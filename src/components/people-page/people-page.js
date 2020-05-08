import React from 'react';

import './people-page.css';

import Api from '../../modules/api';
import PersonDetails from '../person-details/person-details';
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
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapi.getAllPeople}
        renderItem={({ name, birthYear, gender }) => {
          return `${name} (${gender}, ${birthYear})`
        }} />
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails
          personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} rigth={personDetails} />
    );
  }
}