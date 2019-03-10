import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputSelect from '../InputSelect';

const props = {
  className: 'MyInputSelect',
  name: 'MyInputName',
  label: 'My Input Label',
  options: [
    {
      value: 'first_value',
      label: 'First Value',
    },
    {
      value: 'second_value',
      label: 'Second Value',
    },
  ],
  value: 'first_value',
  disabled: false,
  focused: false,
  validationKeys: {
    required: false,
    validationAlert: '',
    warningAlert: '',
  },
  handleChange: () => {},
  handleFocus: () => {},
  handleBlur: () => {},
};

describe('InputSelect', () => {
  it('should render the component with first value', () => {
    const tree = shallow(<InputSelect {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with warning if value not in options', () => {
    const tree = shallow(<InputSelect {...props} value="" />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with second value', () => {
    const tree = shallow(<InputSelect {...props} value="second_value" />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with focused classes while focused', () => {
    const tree = shallow(<InputSelect {...props} focused />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with disabled classes while disabled', () => {
    const tree = shallow(<InputSelect {...props} disabled />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input', () => {
    const tree = shallow(<InputSelect
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input', () => {
    const tree = shallow(<InputSelect
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a validation alert message', () => {
    const tree = shallow(<InputSelect
      {...props}
      validationKeys={{ validationAlert: 'My validation alert message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a warning message', () => {
    const tree = shallow(<InputSelect
      {...props}
      validationKeys={{ warningAlert: 'My warning message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with is loading text', () => {
    const tree = shallow(<InputSelect {...props} value="" loading="Is loading ..." />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with is error message', () => {
    const tree = shallow(<InputSelect {...props} value="" error="Error message" />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
