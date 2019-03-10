import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Button from '../Button';

const props = {
  className: 'myClassname',
  onClick: () => {},
};
const text = 'Mytext';
const iconName = 'chevron-up';

describe('Button', () => {
  it('should render the component correctly with text and icon', () => {
    const tree = shallow(<Button {...props} text={text} iconName={iconName} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component without text if iconName is defined and not blank', () => {
    const tree = shallow(<Button {...props} iconName={iconName} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component without icon if text is defined and not blank', () => {
    const tree = shallow(<Button {...props} text={text} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component for disabled state', () => {
    const tree = shallow(<Button {...props} text={text} iconName={iconName} disabled />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should not render the component if text and iconName are undefined', () => {
    const tree = shallow(<Button {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should not render the component if text and iconName are blank', () => {
    const tree = shallow(<Button {...props} text="" iconName="" />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component if onClick is undefined and type is submit', () => {
    const tree = shallow(<Button {...props} text={text} onClick={undefined} type="submit" />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should not render the component if onClick is undefined and type not submit', () => {
    const tree = shallow(<Button {...props} text={text} onClick={undefined} type="button" />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component for loading state', () => {
    const tree = shallow(<Button {...props} text={text} iconName={iconName} loading />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
