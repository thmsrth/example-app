import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InputText from '../InputText';

const props = {
  className: 'MyInputText',
  name: 'mytext',
  label: 'My Input Label',
  type: 'text',
  value: 'My Text',
  validationKeys: {
    required: false,
    validationAlert: '',
    warningAlert: '',
  },
  onChange: () => {},
};

describe('InputText', () => {
  it('should render the component correctly with type text', () => {
    const tree = shallow(<InputText {...props} />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with type number', () => {
    const tree = shallow(<InputText
      {...props}
      type="number"
      value="1"
      name="mynumber"
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component correctly with type text as a required input', () => {
    const tree = shallow(<InputText {...props} required />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component as a required input', () => {
    const tree = shallow(<InputText
      {...props}
      validationKeys={{ required: true }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a validation alert message', () => {
    const tree = shallow(<InputText
      {...props}
      validationKeys={{ validationAlert: 'My validation alert message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render the component with a warning message', () => {
    const tree = shallow(<InputText
      {...props}
      validationKeys={{ warningAlert: 'My warning message' }}
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
