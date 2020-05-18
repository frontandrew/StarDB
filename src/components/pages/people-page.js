import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Row from '../row/row';

import { PersonDetails, PersonList } from '../sw-components';

const PeoplePage = ({ match, history }) => {
  const { id } = match.params;
  return (
    <Fragment>
      <h2>People</h2>
      <Row
        left={<PersonList onItemSelected={id => history.push(id)} />}
        rigth={<PersonDetails itemId={id} />}
      />
    </Fragment>
  );
}

export default withRouter(PeoplePage);