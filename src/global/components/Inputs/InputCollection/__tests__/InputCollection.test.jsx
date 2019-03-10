import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputCollection from '../InputCollection';

const value = [
  {
    myFirstField: {
      isValid: true,
      showWarning: false,
      value: 'http://someurl.foo',
    },
    mySecondField: {
      isValid: true,
      showWarning: false,
      value: 'firstOption',
    },
  },
  {
    myFirstField: {
      isValid: true,
      showWarning: false,
      value: 'http://someotherurl.bar',
    },
    mySecondField: {
      isValid: true,
      showWarning: false,
      value: 'secondOption',
    },
  },
];

const valueWithWarning = [
  {
    myFirstField: {
      isValid: true,
      showWarning: true,
      value: 'http://someurl.foo',
    },
    mySecondField: {
      isValid: true,
      showWarning: true,
      value: 'firstOption',
    },
  },
  {
    myFirstField: {
      isValid: true,
      showWarning: true,
      value: 'http://someotherurl.bar',
    },
    mySecondField: {
      isValid: true,
      showWarning: true,
      value: 'secondOption',
    },
  },
];

const valueWithValidationAlert = [
  {
    myFirstField: {
      isValid: false,
      showWarning: false,
      value: 'http://someurl.foo',
    },
    mySecondField: {
      isValid: false,
      showWarning: false,
      value: 'firstOption',
    },
  },
  {
    myFirstField: {
      isValid: false,
      showWarning: false,
      value: 'http://someotherurl.bar',
    },
    mySecondField: {
      isValid: false,
      showWarning: false,
      value: 'secondOption',
    },
  },
];

const props = {
  className: 'MyInputCollection',
  name: 'MyInputName',
  label: 'My Input Collection Label',
  fields: [
    {
      name: 'myFirstField',
      title: 'My First Field',
      type: 'text',
      required: true,
      validationAlert: 'Please enter a myFirstField',
      warningAlert: 'My First Field Warning',
    },
    {
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
  ],
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

describe('InputCollection', () => {
  it('should render the component correctly', () => {
    const tree = shallow(<InputCollection {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with warnings for each items field', () => {
    const tree = shallow(<InputCollection {...propsWithWarning} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with validation alert for each items field', () => {
    const tree = shallow(<InputCollection {...propsWithValidationAlert} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
