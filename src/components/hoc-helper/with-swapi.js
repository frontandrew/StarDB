import React from 'react';

import { ApiConsumer } from '../api-context/api-context';

const withSwapi = (mapApiMethodsToProps) => (Component) => {
  return (props) => {
    return (
      <ApiConsumer>
        {
          (swapi) => {
            const apiProps = mapApiMethodsToProps(swapi);
            return <Component {...props} {...apiProps} />
          }
        }
      </ApiConsumer>
    );
  }
}

export default withSwapi;