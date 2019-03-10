import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DetailHeaderActions from '../DetailHeaderActions';

global.permissions = {
  EXAMPLE_EDIT: true,
  EXAMPLE_DELETE: true,
};

const props = {
  item: {
    status: 'UNHEALTHY',
  },
};

describe('DetailHeaderActions', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<DetailHeaderActions {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with loading', () => {
    const tree = shallow(<DetailHeaderActions {...props} dataDeleting="Loading ..." />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
