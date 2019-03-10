import {
  shape,
  bool,
  string,
  func,
  instanceOf,
} from 'prop-types';

const validationKeys = shape({
  required: bool,
  pattern: instanceOf(RegExp),
  validationAlert: string,
  warningAlert: string,
  onValidate: func,
  onWarning: func,
});

export default validationKeys;
