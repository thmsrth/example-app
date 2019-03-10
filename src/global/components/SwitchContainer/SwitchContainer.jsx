import React from 'react';
import PropTypes from 'prop-types';
import { bemCls } from '../../utils/ClassNameHelpers';

import './SwitchContainer.css';

const SwitchContainer = ({
  className, children, options, selected, handleChange,
}) => (
  <div className={`SwitchContainer ${className}`}>
    <div className={`${bemCls(`SwitchContainer ${className}`, '__options')}`}>
      {options.map(option => (
        <div
          key={option.key}
          className={`${bemCls(`SwitchContainer ${className}`, '__option')} ${
            bemCls(`SwitchContainer ${className}`, '__selected', selected === option.key)}`}
        >
          <label className={`${bemCls(`SwitchContainer ${className}`, '__label')}`}>
            <input
              className={`${bemCls(`SwitchContainer ${className}`, '__input')}`}
              type="radio"
              id={option.key}
              value={option.key}
              onChange={() => handleChange(option.key)}
              checked={selected === option.key}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
    <div className={`${bemCls(`SwitchContainer ${className}`, '__children')}`}>
      {children.find(child => child.key === selected)}
    </div>
  </div>
);

export default SwitchContainer;

SwitchContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  })),
  selected: PropTypes.string,
  handleChange: PropTypes.func,
};

SwitchContainer.defaultProps = {
  className: '',
  children: null,
  options: [
    {
      key: '1',
      label: 'Option label',
    },
    {
      key: '2',
      label: 'Another label',
    },
    {
      key: '3',
      label: 'Third label',
    },
  ],
  selected: null,
  handleChange: () => {},
};
