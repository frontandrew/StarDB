import React from 'react';

import './item-details.css';

import Spiner from '../spiner/spiner';
import ErrorBoundry from '../error-boundry/error-boundry';
import ErrorButton from '../error-button/error-button';
import ErrorMessage from '../error-message/error-message';

const Record = ({ item, field, label }) => {
  return (
    <li key={item.id}
      className="list-group-item">
      <span className="term">{`${label}: `}</span>
      <span>{item[field]}</span>
    </li>
  );
}

export { Record };

export default class ItemDetails extends React.Component {

  state = {
    item: null,
    image: null,
    loading: false,
    hasError: false
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    const { itemId, getData, getImageUrl } = this.props;

    if (itemId !== prevProps.itemId ||
        getData !== prevProps.getData ||
        getImageUrl !== prevProps.getImageUrl) {
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
      })
      .catch((err) => {
        this.setState({
          hasError: true,
          loading: false
        });
      });
  }

  render() {
    const { loading, item, image, hasError } = this.state;

    if (hasError) {
      return <ErrorMessage />
    }

    const content = item ? <ItemContent item={item} image={image} children={this.props.children} /> : null;
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

const ItemContent = ({ item, image, children }) => {
  return (
    <React.Fragment>

      <img className="item-image" alt="view of selected"
        src={image} />
      <div className="card-body">
        <h4>{item.name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { item })
            })
          }
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