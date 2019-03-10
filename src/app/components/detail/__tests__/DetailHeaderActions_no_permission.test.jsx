import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DetailHeaderActions from '../DetailHeaderActions';

global.permissions = {};

const props = {
  item: {
    status: 'UNHEALTHY',
  },
};

describe('DetailHeaderActions', () => {
  it('should render the buttons disabled', () => {
    const tree = shallow(<DetailHeaderActions {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
