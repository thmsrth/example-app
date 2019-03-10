import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import staticData from '../../../static/data.json';
import Detail from '../Detail';

global.permissions = {};

const item = staticData._embedded.foods[0];
const props = { item };

describe('Detail', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<Detail {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
