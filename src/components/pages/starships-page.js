import React from 'react';

import Row from '../row/row';

import { StarshipDetails, StarshipList } from '../sw-components';

export default class StarshipsPage extends React.Component {

  state = {
    itemId: null
  }

  onItemSelected = (itemId) => {
    this.setState({ itemId })
  }

  render() {
    return (
      <Row
        left={<StarshipList onItemSelected={this.onItemSelected} />}
        rigth={<StarshipDetails itemId={this.state.itemId} />}
      />
    );
  }
}