import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import staticData from '../../../static/data.json';
import DetailInfos from '../DetailInfos';

global.permissions = {};

const item = staticData._embedded.foods[0];
const props = {
  item,
};

describe('DetailInfos', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<DetailInfos {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
