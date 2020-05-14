import React from 'react'

import ItemList from '../item-list/item-list'
import withData from '../hoc-helper/with-data'
import withSwapi from '../hoc-helper/with-swapi'

const withChildFunc = (childFunc) => (Component) => {
  return (props) => {
    return (
      <Component {...props}>
        {childFunc}
      </Component>
    );
  }
}

const personLabel = ({ name }) => <span>{name}</span>;
const starshipLabel = ({ name, model }) => <span>{name} ({model})</span>;
const planetLabel = ({ name, population }) => <span>{name} ({population})</span>;

const mapPersonMethodsToProps = (swapi) => {
  return { getData: swapi.getAllPeople }
}
const mapPlanetMethodsToProps = (swapi) => {
  return { getData: swapi.getAllPlanets }
}
const mapStarshipMethodsToProps = (swapi) => {
  return { getData: swapi.getAllStarships }
}

const PersonList = withSwapi(mapPersonMethodsToProps)(withData(withChildFunc(personLabel)(ItemList)));
const PlanetList = withSwapi(mapPlanetMethodsToProps)(withData(withChildFunc(planetLabel)(ItemList)));
const StarshipList = withSwapi(mapStarshipMethodsToProps)(withData(withChildFunc(starshipLabel)(ItemList)));

export {
  PersonList,
  PlanetList,
  StarshipList
}