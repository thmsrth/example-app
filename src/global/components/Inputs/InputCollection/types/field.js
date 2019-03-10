import {
  shape,
  bool,
  number,
  string,
  func,
  instanceOf,
  arrayOf,
  oneOfType,
} from 'prop-types';

const field = shape({
  name: string.isRequired,
  title: string,
  type: string,
  placeholder: string,
  required: bool,
  pattern: instanceOf(RegExp),
  htmlPattern: string,
  validationAlert: string,
  warningAlert: string,
  onValidate: func,
  onWarning: func,
  optionsFromDataKey: string,
  clearable: bool,
  searchable: bool,
  options: arrayOf(shape({
    value: oneOfType([
      string,
      number,
      bool,
    ]),
    label: string,
  })),
});

export default field;
