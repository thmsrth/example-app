import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Image from '../Image';

const props = {
  className: 'MyImage',
  image: {
    name: 'image',
    path: '/folder/img.jpg',
    label: 'Image',
  },
};

describe('Image', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<Image {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with no image', () => {
    const tree = shallow(<Image {...props} image={{ label: 'Label with no image' }} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
