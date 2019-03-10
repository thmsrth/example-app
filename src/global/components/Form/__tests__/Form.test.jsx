import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Form from '../Form';

const data = {
  name: {
    isValid: true,
    showWarning: false,
    value: 'My Name',
  },
  description: {
    isValid: true,
    showWarning: false,
    value: 'My Description',
  },
};

const props = {
  action: 'edit',
  className: 'MyClassForm',
  keys: [
    {
      name: 'name',
      title: 'Name (internal use)*',
      type: 'text',
      format: 'uppercase',
      required: true,
      warningAlert: 'My Warning Message',
      validationAlert: 'My Validation Alert Message',
    },
    {
      name: 'description',
      title: 'Description (internal use)',
      type: 'text',
      format: 'capitalize',
      warningAlert: 'My Warning Message',
      validationAlert: 'My Validation Alert Message',
    },
    null,
  ],
  data,
  handleCancel: () => {},
};

const dataWithWarning = {
  data: {
    name: {
      isValid: true,
      showWarning: true,
      value: 'My Name',
    },
    description: {
      isValid: true,
      showWarning: true,
      value: 'My Description',
    },
  },
};

const dataWithValidationAlert = {
  data: {
    name: {
      isValid: false,
      showWarning: false,
      value: 'My Name',
    },
    description: {
      isValid: false,
      showWarning: false,
      value: 'My Description',
    },
  },
};

describe('Form', () => {
  it('should render the component correctly for the edit action with data', () => {
    const tree = shallow(<Form {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly for the create action with data', () => {
    const tree = shallow(<Form
      {...props}
      action="create"
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with form/fieldset disabled while loading', () => {
    const tree = shallow(<Form {...props} loading="Loading..." />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with warning message for each field', () => {
    const tree = shallow(<Form
      {...props}
      {...dataWithWarning}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with validation alert message for each field', () => {
    const tree = shallow(<Form
      {...props}
      {...dataWithValidationAlert}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
