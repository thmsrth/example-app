import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DetailsList from '../DetailsList';

const props = {
  item: {
    id: 1,
    userId: 2,
    name: 'Thomas',
    description: 'huhu',
    number: 1,
    alive: true,
  },
  keys: [
    {
      name: 'name',
      title: 'Name:',
      type: 'text',
    },
  ],
};


describe('DetailsList', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<DetailsList
      {...props}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with property from other data entity by id', () => {
    const tree = shallow(<DetailsList
      {...props}
      propertyFromData={{
        users: [
          {
            id: 2,
            username: 'My User Name',
          },
        ],
      }}
      keys={[
        {
          name: 'user.username',
          title: 'Username:',
          type: 'text',
          propertyFromDataKey: 'users',
        },
      ]}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
