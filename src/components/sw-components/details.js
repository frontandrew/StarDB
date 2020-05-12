import React from 'react'

import { ApiConsumer } from '../api-context/api-context';
import ItemDetails, { Record } from '../item-details/item-details'

const PersonDetails = ({ itemId }) => {
  return (
    <ApiConsumer>
      {
        ({ getPerson, getPersonImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPerson}
              getImageUrl={getPersonImage} >

              <Record field="gender" label="Gender" />
              <Record field="birthYear" label="Birth year" />
              <Record field="height" label="Height" />
              <Record field="eyeColor" label="Eye color" />

            </ItemDetails>
          );
        }
      }
    </ApiConsumer>
  );
};

const PlanetDetails = ({ itemId }) => {
  return (
    <ApiConsumer>
      {
        ({ getPlanet, getPlanetImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPlanet}
              getImageUrl={getPlanetImage} >

              <Record field="diameter" label="Diameter" />
              <Record field="population" label="Population" />
              <Record field="climate" label="Climate" />

            </ItemDetails>
          );
        }
      }
    </ApiConsumer>
  );
};

const StarshipDetails = ({ itemId }) => {
  return (
    <ApiConsumer>
      {
        ({ getStarship, getStarshipImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getStarship}
              getImageUrl={getStarshipImage} >

              <Record field="model" label="Model" />
              <Record field="costInCredits" label="Cost" />
              <Record field="length" label="Length" />
              <Record field="passengers" label="Passengers" />

            </ItemDetails>
          );
        }
      }
    </ApiConsumer>
  );
};

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
}