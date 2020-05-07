import React from 'react';

import './item-list.css';

import Api from '../../modules/api';
import Spiner from '../spiner/spiner';

export default class ItemList extends React.Component {

  state = {
    itemsList: null,
  }

  componentDidMount() {
    
    //const { getData } = this.props;
    
    this.props.getData()
      .then((itemsList) => {
        this.setState({ itemsList });
      });
  }

  renderItems(itemsList) {
    return itemsList.map(({ id, name }) => {
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

    const { itemsList } = this.state;

    if (!itemsList) {
      return <Spiner />
    }

    const items = this.renderItems(itemsList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}