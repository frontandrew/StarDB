import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';

import { ApiProvider } from '../api-context/api-context';
import Api from '../../modules/api';
import TestApi from '../../modules/test-api';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import ErrorBoundry from '../error-boundry/error-boundry';
import { StarshipDetails } from '../sw-components';

export default class App extends React.Component {

  state = {
    swapi: new Api(),
  }

  onApiChange = () => {
    this.setState(({ swapi }) => {
      const Service = swapi instanceof Api ? TestApi : Api;
      console.log('switched to: ' + Service.name)

      return { swapi: new Service() }
    });
  }

  render() {
    return (
      <ErrorBoundry>
        <ApiProvider value={this.state.swapi}>
          <Router>
            <div className="stardb-app">

              <Header onApiChange={this.onApiChange} />
              <RandomPlanet updateInterval={60000} />

              <Route path="/"
                render={() => <h2>Welcome to Star DB</h2>}
                exact />
              <Route path="/people" render={() => <h2>People</h2>} />
              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" render={() => <h2>Planets</h2>} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route path="/starships/:id"
                render={({ match }) => {
                  return <StarshipDetails itemId={match.params.id} />
                }} />

            </div>
          </Router>
        </ApiProvider>
      </ErrorBoundry>
    );
  }
};