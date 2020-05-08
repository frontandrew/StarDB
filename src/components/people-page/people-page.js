import React from 'react';

import './people-page.css';

import Api from '../../modules/api';
import PersonDetails from '../person-details/person-details';
import ItemList from '../item-list/item-list';
import ErrorMessage from '../error-message/error-message';

export default class PeoplePage extends React.Component {

  swapi = new Api();

  state = {
    selectedPerson: null,
    hasError: false,
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    })
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorMessage />
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapi.getAllPeople}
            renderItem={({ name, birthYear, gender }) => `${name} (${gender}, ${birthYear})`} />
        </div>
        <div className="col-md-6">
          <PersonDetails
            personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}