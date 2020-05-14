import React from 'react';

import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';


const withData = (View) => {
  return class extends React.Component {

    state = {
      data: null,
      error: false,
      loading: true
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update()
      }
    }

    componentDidMount() {
      this.update()
    }

    update() {
      this.setState({
        loading: true,
        error: false
      });

      this.props.getData()
        .then((data) => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            error: true,
            loading: false
          })
        });
    }

    render() {
      const { data, error, loading } = this.state;

      if (error) {
        return <ErrorMessage />
      }

      if (loading) {
        return <Spiner />
      }

      return <View {...this.props} data={data} />
    }
  }
}

export default withData;