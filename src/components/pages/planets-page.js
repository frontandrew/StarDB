import React from 'react';

import Row from '../row/row';

import { PlanetDetails, PlanetList } from '../sw-components';

export default class PlanetsPage extends React.Component {

  state = {
    itemId: null
  }

  onItemSelected = (itemId) => {
    this.setState({ itemId })
  }

  render() {
    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        rigth={<PlanetDetails itemId={this.state.itemId} />}
      />
    );
  }
}