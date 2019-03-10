/**
 * Dropdown Component for React
 *
 * Description:
 * This component is a simple dropdown trigger which displays its children in a container.
 *
 * Additional Features:
 * - closeOnClickOutside (Boolean), true per default
 *
 * Dependencies:
 * - react-onclickoutside
 *
 * Example usage :
 * <Dropdown
 *   text={currentItem.title}
 *   className="ItemsListDropdown"
 *   closeOnClickOutside: false
 *   children=<ListOfItems items={items} />
 * />
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import Dropdown from './Dropdown';

class DropdownWrapper extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  }

  handleClickOutside() {
    if (this.props.closeOnClickOutside && this.state.isActive) {
      this.setState({ isActive: false });
    }
  }

  render() {
    const { isActive } = this.state;
    return (
      <Dropdown
        {...this.props}
        isActive={isActive}
        onClick={this.handleClick}
      />
    );
  }
}

DropdownWrapper.propTypes = {
  ...Dropdown.propTypes,
  closeOnClickOutside: PropTypes.bool,
};

DropdownWrapper.defaultProps = {
  ...Dropdown.defaultProps,
  closeOnClickOutside: true,
};

export default onClickOutside(DropdownWrapper);
