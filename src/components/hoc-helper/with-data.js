import React from 'react';

import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';


const withData = (View, getData) => {
  return class extends React.Component {

    state = {
      data: null,
      hasError: false,
    }

    componentDidMount() {

      getData()
        .then((data) => {
          this.setState({ data });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ hasError: true })
        });
    }

    render() {
      const { data, hasError } = this.state;

      if (hasError) {
        return <ErrorMessage />
      }

      if (!data) {
        return <Spiner />
      }

      return <View {...this.props} data={data} />

    }
  }
}

export default withData;