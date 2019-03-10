import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DetailsListItemValue from '../DetailsListItemValue';

describe('DetailsListItemValue', () => {
  it('should render the component correctly with text value', () => {
    const tree = shallow(<DetailsListItemValue
      value="huhu"
      keyProp={{ name: 'description', title: 'Description:', type: 'text' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with date value', () => {
    const tree = shallow(<DetailsListItemValue
      value={1536832916}
      keyProp={{ name: 'date', title: 'Date:', type: 'date' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
