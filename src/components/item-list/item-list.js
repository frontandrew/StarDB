import React from 'react';

import './item-list.css';

import Api from '../../modules/api';
import Spiner from '../spiner/spiner';

export default class ItemList extends React.Component {

  swapi = new Api();

  state = {
    peopleList: null,
  }

  componentDidMount() {
    this.swapi.getAllPeople()
      .then((peopleList) => {
        this.setState({ peopleList });
      });
  }

  renderItems(peopleList) {
    return peopleList.map(({ id, name }) => {
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    })
  }

  render() {

    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spiner />
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}