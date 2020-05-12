import React from 'react'

import withSwapi from '../hoc-helper/with-swapi';
import ItemDetails, { Record } from '../item-details/item-details'

const PlanetDetails = (props) => {
  return (
    <ItemDetails {...props} >

      <Record field="diameter" label="Diameter" />
      <Record field="population" label="Population" />
      <Record field="climate" label="Climate" />

    </ItemDetails>
  );
}

const mapApiMethodsToProps = (api) => {
  return {
    getData: api.getPlanet,
    getImageUrl: api.getPlanetImage
  }
}

export default withSwapi(PlanetDetails, mapApiMethodsToProps);