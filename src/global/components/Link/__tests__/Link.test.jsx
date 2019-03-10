import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Link from '../Link';

const props = {
  className: 'myClassname',
  href: '/contact/user/400000227',
  text: 'Mytext',
};

describe('Link', () => {
  it('should render the component correctly with text and href', () => {
    const tree = shallow(<Link {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with children and href', () => {
    const component = (
      <Link {...props}>
        <div className="MyChildComponent" />
      </Link>
    );
    const tree = shallow(component);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with disabled state', () => {
    const tree = shallow(<Link {...props} disabled />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should not render the component if href is blank', () => {
    const tree = shallow(<Link
      {...props}
      href={undefined}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
