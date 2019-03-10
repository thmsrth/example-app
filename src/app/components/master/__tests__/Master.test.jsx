import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import staticData from '../../../static/data.json';
import Master from '../Master';

global.permissions = {
  EXAMPLE_LIST: true,
};

const { _embedded } = staticData;

const props = {
  data: _embedded.foods,
  dataLoading: '',
  dataError: '',
};

describe('Master', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<Master {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
