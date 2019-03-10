import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { sortObjectMethod } from '../../utils/SortHelpers';

import OverviewList from './OverviewList';

class OverviewListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      lastSortedKey: props.sortedKey,
      lastSortOrder: props.sortOrder,
    };
    this.handleListHeaderClick = this.handleListHeaderClick.bind(this);
  }

  componentDidMount() {
    const { lastSortedKey, lastSortOrder } = this.state;
    const { items } = this.props;

    this.sortItems(items, lastSortedKey, null, lastSortOrder);
  }

  componentWillReceiveProps(nextProps) {
    const { serverSidedSorting } = this.props;
    const { items, sortedKey, sortOrder } = nextProps;
    if (serverSidedSorting) {
      this.setState({
        items,
        lastSortedKey: sortedKey,
        lastSortOrder: sortOrder,
      });
    } else {
      this.setState({
        items,
      });
    }
  }

  getNewSortOrder(key, sortOrder) {
    const { lastSortedKey, lastSortOrder } = this.state;
    let newSortOrder = 'ASC';
    if (sortOrder) {
      newSortOrder = sortOrder;
    } else if (key === lastSortedKey) {
      newSortOrder = lastSortOrder === 'ASC' ? 'DESC' : 'ASC';
    }
    return newSortOrder;
  }

  handleListHeaderClick(key, property) {
    const { items } = this.state;
    const { serverSidedSorting, fetchSortedItems, updateSortQueryParams } = this.props;
    const newSortOrder = this.getNewSortOrder(key);
    if (key) {
      if (updateSortQueryParams) updateSortQueryParams(key, newSortOrder);
      if (serverSidedSorting) {
        fetchSortedItems(key, newSortOrder);
      } else {
        this.sortItems(items, key, property);
      }
    }
  }

  sortItems(items, key, property, sortOrder) {
    const newSortOrder = this.getNewSortOrder(key, sortOrder);
    if (key) items.sort(sortObjectMethod(property || key, newSortOrder));
    this.setState({
      items,
      lastSortedKey: key,
      lastSortOrder: newSortOrder,
    });
  }

  render() {
    const { items, lastSortedKey, lastSortOrder } = this.state;
    return (
      <OverviewList
        {...this.props}
        items={items}
        activeKey={lastSortedKey}
        sortOrder={lastSortOrder}
        handleListHeaderClick={this.handleListHeaderClick}
      />
    );
  }
}

export default OverviewListWrapper;

OverviewListWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object),
  serverSidedSorting: PropTypes.bool,
  sortedKey: PropTypes.string,
  sortOrder: PropTypes.string,
  fetchSortedItems: PropTypes.func,
  updateSortQueryParams: PropTypes.func,
};

OverviewListWrapper.defaultProps = {
  items: [],
  serverSidedSorting: false,
  sortedKey: '',
  sortOrder: 'ASC',
  fetchSortedItems: () => {},
  updateSortQueryParams: undefined,
};
