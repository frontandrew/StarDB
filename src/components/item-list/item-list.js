import React from 'react';

import './item-list.css';

import Spiner from '../spiner/spiner';

export default class ItemList extends React.Component {

  state = {
    itemsList: null,
  }

  componentDidMount() {

    const { getData } = this.props;

    getData()
      .then((itemsList) => {
        this.setState({ itemsList });
      });
  }

  renderItems(itemsList) {
    return itemsList.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}>
          {label}
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