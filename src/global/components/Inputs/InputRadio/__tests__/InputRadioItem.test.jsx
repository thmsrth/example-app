import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputRadioItem from '../InputRadioItem';

const props = {
  className: 'MyInputRadioItem',
  name: 'type',
  label: 'My Radio Item Input Label',
  onChange: () => {},
  value: 'EMPLOYEE',
};

describe('InputRadioItem', () => {
  it('should render the radio input component correctly but not checked', () => {
    const tree = shallow(<InputRadioItem {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the radio input component correctly and checked', () => {
    const tree = shallow(<InputRadioItem {...props} checked />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
