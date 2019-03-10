import React, { Component } from 'react';
import PropTypes from 'prop-types';

import dataItem from '../../types/dataItem';

import BeersList from './BeersList';

class BeersListWrapper extends Component {
  componentDidMount() {
    const {
      fetchBeers,
      item,
    } = this.props;
    fetchBeers({ food: item.name });
  }

  render() {
    return (
      <BeersList {...this.props} />
    );
  }
}

export default BeersListWrapper;

BeersListWrapper.propTypes = {
  fetchBeers: PropTypes.func,
  item: dataItem,
};

BeersListWrapper.defaultProps = {
  fetchBeers: () => {},
  item: null,
};
