import React from 'react';

import './item-details.css';

//import Api from '../../modules/api';
import Spiner from '../spiner/spiner';
import ErrorBoundry from '../error-boundry/error-boundry';
import ErrorButton from '../error-button/error-button';

export default class ItemDetails extends React.Component {

  //swapi = new Api();

  state = {
    item: null,
    image: null,
    loading: false
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) return;

    this.setState({ item: null, loading: true });
    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          image: getImageUrl(item),
          loading: false 
        });
      });
  }

  render() {
    const { item, loading, image } = this.state;

    const content = item ? <ItemContent item={item} image={image}/> : null;
    const spiner = loading ? <Spiner /> : null;
    const message = !this.props.itemId ? <InitialMessage /> : null;

    return (
      <ErrorBoundry>
        <div className="item-details card list-group-item">
          {message}
          {content}
          {spiner}
        </div>
      </ErrorBoundry>
    )
  }
}

const ItemContent = ({ item, image }) => {

  const { id, name, height, gender, birthYear, eyeColor } = item;

  return (
    <React.Fragment>

      <img className="item-image" alt="item image"
        src={image} />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Birth Year:</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Gender:</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Height:</span>
            <span>{height}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color:</span>
            <span>{eyeColor}</span>
          </li>
          <li className="list-group-item">
            <ErrorButton />
          </li>
        </ul>
      </div>

    </React.Fragment>
  );
}

const InitialMessage = () => {
  return (
    <React.Fragment>
      <span
        className="init-message">
        Select a character from a list
      </span>
    </React.Fragment>
  )
}