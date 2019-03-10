import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputCollectionField from '../InputCollectionField';

const value = {
  isValid: true,
  showWarning: false,
  value: 'firstOption',
};

const valueWithWarning = {
  isValid: true,
  showWarning: true,
  value: 'firstOption',
};

const valueWithValidationAlert = {
  isValid: false,
  showWarning: false,
  value: 'firstOption',
};

const props = {
  className: 'MyInputCollectionField',
  name: 'MyInputName',
  field: {
    name: 'mySecondField',
    title: 'My Second Field',
    type: 'select',
    required: true,
    validationAlert: 'Please select a mySecondField',
    warningAlert: 'My Second Field Warning',
    options: [
      {
        label: 'First Option',
        value: 'firstOption',
      },
      {
        label: 'Second Option',
        value: 'secondOption',
      },
    ],
  },
  value,
};

const propsWithWarning = {
  ...props,
  value: valueWithWarning,
};

const propsWithValidationAlert = {
  ...props,
  value: valueWithValidationAlert,
};

describe('InputCollectionField', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<InputCollectionField {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with warnings for each items field', () => {
    const tree = shallow(<InputCollectionField {...propsWithWarning} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with validation alert for each items field', () => {
    const tree = shallow(<InputCollectionField {...propsWithValidationAlert} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
