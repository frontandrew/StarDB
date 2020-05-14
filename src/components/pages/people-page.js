import React from 'react';

import Row from '../row/row';

import { PersonDetails, PersonList } from '../sw-components';

export default class PeoplePage extends React.Component {

  state = {
    itemId: null
  }

  onItemSelected = (itemId) => {
    this.setState({ itemId })
  }

  render() {
    return (
      <Row
        left={<PersonList onItemSelected={this.onItemSelected} />}
        rigth={<PersonDetails itemId={this.state.itemId} />}
      />
    );
  }
}