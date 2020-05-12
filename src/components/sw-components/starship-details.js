import React from 'react'

import withSwapi from '../hoc-helper/with-swapi';
import ItemDetails, { Record } from '../item-details/item-details';

const StarshipDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="model" label="Model" />
      <Record field="costInCredits" label="Cost" />
      <Record field="length" label="Length" />
      <Record field="passengers" label="Passengers" />
    </ItemDetails>
  );
}

const mapApiMethodsToProps = (api) => {
  return {
    getData: api.getStarship,
    getImageUrl: api.getStarshipImage
  }
}

export default withSwapi(StarshipDetails, mapApiMethodsToProps);