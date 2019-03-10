import {
  shape,
  bool,
  string,
  func,
  arrayOf,
  objectOf,
} from 'prop-types';

const key = shape({
  name: string,
  property: string,
  title: string,
  type: string,
  format: string,
  translationPath: objectOf(string),
  path: string,
  target: string,
  condition: bool,
  showCondition: func,
  options: arrayOf(shape({
    name: string,
    title: string,
    type: string,
    condition: bool,
    icon: string,
    handler: func,
    linkParam: string,
    actionParams: arrayOf(string),
  })),
  required: bool,
});

export default key;
