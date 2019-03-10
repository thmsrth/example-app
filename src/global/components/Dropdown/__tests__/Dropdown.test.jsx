import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dropdown from '../Dropdown';

const props = {
  className: 'MyDropdown',
  text: 'MyText',
  isActive: false,
  onClick: () => {},
  children: <h3>Empty dropdown content</h3>,
};

describe('Dropdown', () => {
  it('should render the component correctly while inactive', () => {
    const tree = shallow(<Dropdown {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly while active', () => {
    const tree = shallow(<Dropdown {...props} isActive />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
