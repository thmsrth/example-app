import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ItemFetcher from '..';

const TestComponent = () => (<div>Test</div>);

const props = {
  data: [
    {
      id: 1,
      name: 'test',
    },
  ],
  id: 1,
};

describe('ItemFetcher', () => {
  it('should render the child component correctly', () => {
    const tree = shallow(<ItemFetcher {...props}><TestComponent /></ItemFetcher>);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
  it('should render the Not Found correctly', () => {
    const tree = shallow(<ItemFetcher {...props} id={2}><TestComponent /></ItemFetcher>);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
