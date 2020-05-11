import React from 'react';

import './item-list.css';

import Api from '../../modules/api';
import withData from '../hoc-helper/with-data';

const ItemList = (props) => {

  const { data, children: renderLabel, onItemSelected } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);
    return (
      <li
        key={id}
        className="list-group-item"
        onClick={() => onItemSelected(id)}>
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
}

const { getAllPeople } = new Api();

export default withData(ItemList, getAllPeople);