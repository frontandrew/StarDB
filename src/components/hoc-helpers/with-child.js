import React from 'react';

const withChildFunc = (childFunc) => (Component) => {
  return (props) => {
    return (
      <Component {...props}>
        {childFunc}
      </Component>
    );
  }
}

export default withChildFunc;