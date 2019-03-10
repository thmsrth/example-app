import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import OverviewListItem from '../OverviewListItem';


const props = {
  templateId: 1,
  name: 'D01',
  description: 'Residental Lease',
  handleOverviewListItemOnClick: () => {},
};


describe('OverviewListItem', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<OverviewListItem
      {...props}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
