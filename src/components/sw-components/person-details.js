import React from 'react'

import withSwapi from '../hoc-helper/with-swapi';
import ItemDetails, { Record } from '../item-details/item-details'

const PersonDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="gender" label="Gender" />
      <Record field="birthYear" label="Birth year" />
      <Record field="height" label="Height" />
      <Record field="eyeColor" label="Eye color" />
    </ItemDetails>
  );
}

const mapApiMethodsToProps = (api) => {
  return {
    getData: api.getPerson,
    getImageUrl: api.getPersonImage
  }
}

export default withSwapi(mapApiMethodsToProps)(PersonDetails);