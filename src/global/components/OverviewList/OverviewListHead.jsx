import React, { Component } from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import Icon from '../Icon';

import { bemCls } from '../../utils/ClassNameHelpers';

import './OverviewListHead.css';

class OverviewListHead extends Component {
  constructor() {
    super();
    this.handleListHeaderClick = this.handleListHeaderClick.bind(this);
  }

  handleListHeaderClick() {
    const { keyProp, handleListHeaderClick } = this.props;
    if (keyProp && keyProp.name && keyProp.name !== 'actions') {
      handleListHeaderClick(keyProp.name, keyProp.property);
    }
  }

  render() {
    const {
      className, keyProp, isActive, sortOrder,
    } = this.props;
    return (
      <div
        className={`OverviewListHead ${className} ${
          bemCls(`OverviewListHead ${className}`, '--active', isActive)} ${
          bemCls(`OverviewListHead ${className}`, '--descending', sortOrder === 'DESC' && isActive)} ${
          bemCls(`OverviewListHead ${className}`, '--ascending', sortOrder === 'ASC' && isActive)}`}
        role="button"
        tabIndex="0"
        onClick={this.handleListHeaderClick}
        onKeyPress={this.handleListHeaderClick}
      >
        <div className={bemCls(`OverviewListHead ${className}`, '__title')}>
          {keyProp.title}
        </div>
        {isActive
          && (
          <Icon
            name={`long-arrow-${sortOrder === 'DESC' ? 'down' : 'up'}`}
            className={bemCls(`OverviewListHead ${className}`, '__icon')}
          />
          )
        }
      </div>
    );
  }
}

export default OverviewListHead;

OverviewListHead.propTypes = {
  keyProp: keyType,
  isActive: PropTypes.bool,
  sortOrder: PropTypes.string,
  className: PropTypes.string,
  handleListHeaderClick: PropTypes.func,
};

OverviewListHead.defaultProps = {
  keyProp: {},
  className: '',
  isActive: false,
  sortOrder: '',
  handleListHeaderClick: () => {},
};
