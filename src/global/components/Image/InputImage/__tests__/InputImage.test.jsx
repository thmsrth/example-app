import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputImage from '../InputImage';

const props = {
  className: 'MyInputImage',
  name: 'myfile',
  label: 'My Input Label',
  value: 'My File URL',
  validationKeys: {
    required: false,
    validationAlert: '',
    warningAlert: '',
  },
  onChange: () => {},
  uploading: '',
  uploadError: '',
};

describe('InputImage', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<InputImage {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input', () => {
    const tree = shallow(<InputImage
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a validation alert message', () => {
    const tree = shallow(<InputImage
      {...props}
      validationKeys={{ validationAlert: 'My validation alert message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a warning message', () => {
    const tree = shallow(<InputImage
      {...props}
      validationKeys={{ warningAlert: 'My warning message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with an uploading message through the button component', () => {
    const tree = shallow(<InputImage
      {...props}
      uploading="Uploading..."
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with an error message through the DataStateNotifier component', () => {
    const tree = shallow(<InputImage
      {...props}
      uploadError="My error message"
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
