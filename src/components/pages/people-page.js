import React from 'react';
import { withRouter } from 'react-router-dom';

import Row from '../row/row';

import { PersonDetails, PersonList } from '../sw-components';

 const PeoplePage = ({ match, history }) => {
   const {id} = match.params;
    return (
      <Row
        left={<PersonList onItemSelected={(id) => history.push(id)} />}
        rigth={<PersonDetails itemId={id} />}
      />
    );
  }

export default withRouter(PeoplePage);