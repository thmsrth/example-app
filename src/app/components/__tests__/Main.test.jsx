import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { MAIN_PATH } from '../../../../config/constants';

import PrivateRoute from '../../../global/security/components/PrivateRoute';

import Main from '../Main';

global.authToken = 'jhHGFjHtfjhgfK';
global.permissions = {
  EXAMPLE_CREATE: true,
  EXAMPLE_EDIT: true,
  EXAMPLE_DETAIL: true,
  EXAMPLE_LIST: true,
};

const props = {
  securityError: '',
};

describe('Main', () => {
  it('should render the routes correctly', () => {
    const tree = shallow(<Main {...props} />);
    const paths = tree.find(PrivateRoute).reduce((map, route) => {
      const pathMap = { ...map };
      const componentProp = route.props().component;
      if (componentProp) {
        // The component is passed to Route as a component prop
        pathMap[route.prop('path')] = componentProp.name;
      } else {
        // The component is passed to Route as a render prop with routerProps as first argument
        const routerProps = { match: { params: { id: 1 } } };
        const renderProp = route.props().render(routerProps);
        pathMap[route.prop('path')] = renderProp.type.name;
      }

      return pathMap;
    }, {});
    expect(paths[MAIN_PATH]).toBe('MasterPage');
    expect(paths[`${MAIN_PATH}/:id(\\d+)`]).toBe('DetailPage');
    expect(paths[`${MAIN_PATH}/:id(\\d+)/edit`]).toBe('EditExamplePage');
    expect(paths[`${MAIN_PATH}/create`]).toBe('CreateExamplePage');
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('should render a security error message', () => {
    const tree = shallow(<Main
      {...props}
      securityError="My Security Error Message"
    />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
