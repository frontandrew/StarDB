import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
/**Switch отрисует только тот первый компонент с которым совпадет
 * запрос, остальные игнорируются. Должен оборачивать компоненты 
 * Route и Redirect.
 * 
 * Route без path срабатывает если остальные пути не совпали с запросом
 * Так можно показывать сообщение 'Page not found' */

import './app.css';

import { ApiProvider } from '../api-context/api-context';
import Api from '../../modules/api';
import TestApi from '../../modules/test-api';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ErrorBoundry from '../error-boundry/error-boundry';
import { StarshipDetails } from '../sw-components';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage,
} from '../pages';

export default class App extends React.Component {

  state = {
    swapi: new Api(),
    isLoggedIn: false,
  }

  onLogIn = () => {
    this.setState({ isLoggedIn: true })
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

              <Switch>
                <Route path="/"
                  render={() => <h2 className="text-center">Welcome to Star DB</h2>}
                  exact />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/starships" exact component={StarshipsPage} />
                <Route path="/starships/:id"
                  render={({ match }) => {
                    return <StarshipDetails itemId={match.params.id} />
                  }} />
                <Route path="/login" render={() => <LoginPage isLoggedIn={this.state.isLoggedIn} onLogIn={this.onLogIn} />} />
                <Route path="/secret" render={() => <SecretPage isLoggedIn={this.state.isLoggedIn} />} />
                
                <Redirect to="/" />
              </Switch>

            </div>
          </Router>
        </ApiProvider>
      </ErrorBoundry>
    );
  }
};