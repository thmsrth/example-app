import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputCheckbox from '../InputCheckbox';

const props = {
  className: 'MyInputCheckbox',
  name: 'mycheckbox',
  label: 'My Input Label',
  validationKeys: {
    required: false,
    validationAlert: '',
    warningAlert: '',
  },
  onChange: () => {},
  options: [
    {
      label: 'Hi',
      value: 1,
    },
    {
      label: 'Ho',
      value: 2,
    },
  ],
};

describe('InputCheckbox', () => {
  it('should render the component correctly and return a false default value', () => {
    const tree = shallow(<InputCheckbox {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly and value 1: true, 2: false', () => {
    const tree = shallow(<InputCheckbox {...props} value={{ 1: true, 2: false }} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input', () => {
    const tree = shallow(<InputCheckbox
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a validation alert message', () => {
    const tree = shallow(<InputCheckbox
      {...props}
      validationKeys={{ validationAlert: 'My validation alert message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a warning message', () => {
    const tree = shallow(<InputCheckbox
      {...props}
      validationKeys={{ warningAlert: 'My warning message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
