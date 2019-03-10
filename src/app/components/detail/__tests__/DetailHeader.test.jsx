import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DetailHeader from '../DetailHeader';

global.permissions = {};

const item = {};
const props = { item };

describe('DetailHeader', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<DetailHeader {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
