import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SwitchContainer from '../SwitchContainer';

const props = {
  className: 'MySwitchContainer',
  selected: '1',
  options: [
    { key: '1', label: 'Hi' },
    { key: '2', label: 'Ciao' },
  ],
  onChange: () => {},
};

describe('SwitchContainer', () => {
  it('should render the component correctly with option 1 selected and h1 Hi component rendered', () => {
    const component = (
      <SwitchContainer {...props}>
        <h1 key="1">Hi</h1>
        <h1 key="2">Ciao</h1>
      </SwitchContainer>
    );
    const tree = shallow(component);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with no option selected', () => {
    const component = (
      <SwitchContainer {...props} selected="">
        <h1 key="1">Hi</h1>
        <h1 key="2">Ciao</h1>
      </SwitchContainer>
    );
    const tree = shallow(component);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
