import React from 'react';

import './person-details.css';
import Api from '../../modules/api';

export default class PersonDetails extends React.Component {

  swapi = new Api();

  state = {
    person: null,
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
    if (!personId) {
      return;
    }

    this.swapi.getPerson(personId)
      .then((person) => {
        this.setState({ person });
      });
  }

  render() {

    if (!this.state.person) {
      return (
        <span>Select a character from a list</span>
      );
    }

    const { id, name, height, gender, birthYear, eyeColor } = this.state.person;

    return (
      <div className="person-details card">
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
          </ul>
        </div>
      </div>
    )
  }
}