import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DetailsListItem from '../DetailsListItem';

const props = {
  value: 'huhu',
  keyProp: {
    name: 'description', title: 'Description:', type: 'text',
  },
};

describe('DetailsListItem', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<DetailsListItem
      {...props}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
