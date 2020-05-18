import React from 'react'

import ItemList from '../item-list/item-list'
import { withData, withSwapi, withChildFunc, compose } from '../hoc-helpers/'


const personLabel = ({ name, gender, birthYear }) => <span>{name} (Gender: {gender}, Birth year: {birthYear})</span>;
const starshipLabel = ({ name, model }) => <span>{name} (Model: {model})</span>;
const planetLabel = ({ name, population }) => <span>{name} (Population: {population} pers.)</span>;

const mapPersonMethodsToProps = (swapi) => {
  return { getData: swapi.getAllPeople }
}
const mapPlanetMethodsToProps = (swapi) => {
  return { getData: swapi.getAllPlanets }
}
const mapStarshipMethodsToProps = (swapi) => {
  return { getData: swapi.getAllStarships }
}

  const PersonList = compose(withSwapi(mapPersonMethodsToProps), withData, withChildFunc(personLabel))(ItemList);
  const PlanetList = compose(withSwapi(mapPlanetMethodsToProps), withData, withChildFunc(planetLabel))(ItemList);
  const StarshipList = compose(withSwapi(mapStarshipMethodsToProps), withData, withChildFunc(starshipLabel))(ItemList);

  export {
    PersonList,
    PlanetList,
    StarshipList
  }