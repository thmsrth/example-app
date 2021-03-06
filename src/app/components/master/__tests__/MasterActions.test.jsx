import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import MasterActions from '../MasterActions';

global.permissions = {
  EXAMPLE_CREATE: true,
};

const props = { myCreateAction: () => {} };

describe('MasterActions', () => {
  it('should render the component correctly with create button', () => {
    const tree = shallow(<MasterActions {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
