import React from 'react';

import './people-page.css';

import PersonDetails from '../person-details/person-details';
import ItemList from '../item-list/item-list';
import ErrorMessage from '../error-message/error-message';

export default class PeoplePage extends React.Component {

  state = {
    selectedPerson: 4,
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
            onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails
            personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}