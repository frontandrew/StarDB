import React from 'react';

import './person-details.css';

import Api from '../../modules/api';
import Spiner from '../spiner/spiner';
import ErrorButton from '../error-button/error-button';

export default class PersonDetails extends React.Component {

  swapi = new Api();

  state = {
    person: null,
    loading: false
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;

    if (!personId) return;

    this.setState({ person: null, loading: true });
    this.swapi.getPerson(personId)
      .then((person) => {
        this.setState({ person, loading: false });
      });
  }

  render() {
    const { person, loading } = this.state;

    const content = person ? <PersonContent person={person} /> : null;
    const spiner = loading ? <Spiner /> : null;
    const message = !this.props.personId ? <InitialMessage /> : null;

    return (
      <div className="person-details card">
        {message}
        {content}
        {spiner}
      </div>
    )
  }
}

const PersonContent = ({ person }) => {

  const { id, name, height, gender, birthYear, eyeColor } = person;

  return (
    <React.Fragment>

      <img className="person-image" alt="person image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
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