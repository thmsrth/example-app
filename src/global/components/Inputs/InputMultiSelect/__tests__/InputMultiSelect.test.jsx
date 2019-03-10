import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputMultiSelect from '../InputMultiSelect';

const props = {
  className: 'MyInputMultiSelect',
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
  value: ['first_value'],
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

describe('InputMultiSelect', () => {
  it('should render the component with first value', () => {
    const tree = shallow(<InputMultiSelect {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with nothing selected', () => {
    const tree = shallow(<InputMultiSelect {...props} value={[]} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with second value', () => {
    const tree = shallow(<InputMultiSelect {...props} value={['second_value']} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with focused classes while focused', () => {
    const tree = shallow(<InputMultiSelect {...props} focused />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with disabled classes while disabled', () => {
    const tree = shallow(<InputMultiSelect {...props} disabled />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input', () => {
    const tree = shallow(<InputMultiSelect
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input', () => {
    const tree = shallow(<InputMultiSelect
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a validation alert message', () => {
    const tree = shallow(<InputMultiSelect
      {...props}
      validationKeys={{ validationAlert: 'My validation alert message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a warning message', () => {
    const tree = shallow(<InputMultiSelect
      {...props}
      validationKeys={{ warningAlert: 'My warning message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with is loading text', () => {
    const tree = shallow(<InputMultiSelect {...props} value={[]} loading="Is loading ..." />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with is error message', () => {
    const tree = shallow(<InputMultiSelect {...props} value={[]} error="Error message" />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
