import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputRadio from '../InputRadio';

const props = {
  className: 'MyInputRadio',
  name: 'type',
  label: 'My Input Label',
  validationKeys: {
    required: false,
    validationAlert: '',
    warningAlert: '',
  },
  onChange: () => {},
  options: [
    {
      value: 'EMPLOYEE',
      label: 'EMPLOYEE',
    },
    {
      value: 'MEMBER',
      label: 'MEMBER',
    },
    {
      value: 'GUEST',
      label: 'GUEST',
    },
  ],
  value: 'EMPLOYEE',
};

describe('InputRadio', () => {
  it('should render radio items components for each option correctly', () => {
    const tree = shallow(<InputRadio {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input not checked', () => {
    const tree = shallow(<InputRadio
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a validation alert message', () => {
    const tree = shallow(<InputRadio
      {...props}
      validationKeys={{ validationAlert: 'My validation alert message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a warning message', () => {
    const tree = shallow(<InputRadio
      {...props}
      validationKeys={{ warningAlert: 'My warning message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
