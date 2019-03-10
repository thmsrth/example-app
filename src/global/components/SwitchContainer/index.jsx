import React from 'react';
import PropTypes from 'prop-types';
import SwitchContainer from './SwitchContainer';

class SwitchContainerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.children ? props.children[0].key : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    this.setState({ selected: selected.toString() });
  }

  render() {
    const {
      selected,
    } = this.state;
    return (
      <SwitchContainer
        selected={selected}
        handleChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

export default SwitchContainerWrapper;

SwitchContainerWrapper.propTypes = {
  children: PropTypes.node,
};

SwitchContainerWrapper.defaultProps = {
  children: null,
};
