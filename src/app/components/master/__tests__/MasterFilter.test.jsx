import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import staticData from '../../../static/data.json';
import MasterFilter from '../MasterFilter';
import I18n from '../../../utils/I18n';

global.permissions = {};

const { _embedded } = staticData;

const props = {
  data: _embedded.foods,
};

describe('MasterFilter', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<MasterFilter {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
