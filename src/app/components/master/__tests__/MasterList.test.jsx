import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import staticData from '../../../static/data.json';
import MasterList from '../MasterList';

global.permissions = {
  EXAMPLE_LIST: true,
};

const { _embedded } = staticData;

const props = {
  data: _embedded.foods,
};

describe('MasterList', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<MasterList {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
