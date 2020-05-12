import React from 'react'

import ItemList from '../item-list/item-list'
import withData from '../hoc-helper/with-data'
import Api from '../../modules/api'

const { getAllPeople, getAllPlanets, getAllStarships } = new Api();

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

const PersonList = withData(withChildFunc(ItemList, personLabel), getAllPeople);
const PlanetList = withData(withChildFunc(ItemList, planetLabel), getAllPlanets);
const StarshipList = withData(withChildFunc(ItemList, starshipLabel), getAllStarships);

export {
  PersonList,
  PlanetList,
  StarshipList
}