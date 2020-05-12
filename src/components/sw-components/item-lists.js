import React from 'react'

import ItemList from '../item-list/item-list'
import withData from '../hoc-helper/with-data'
import withSwapi from '../hoc-helper/with-swapi'

const withChildFunc = (Component, childFunc) => {
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

const PersonList = withSwapi(withData(withChildFunc(ItemList, personLabel)), mapPersonMethodsToProps);
const PlanetList = withSwapi(withData(withChildFunc(ItemList, planetLabel)), mapPlanetMethodsToProps);
const StarshipList = withSwapi(withData(withChildFunc(ItemList, starshipLabel)), mapStarshipMethodsToProps);

export {
  PersonList,
  PlanetList,
  StarshipList
}