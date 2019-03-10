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

import fieldType from '../../Inputs/InputCollection/types/field';

const keys = arrayOf(shape({
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
  fields: arrayOf(fieldType),
  closeOnSelect: bool,
  onSelectResetsInput: bool,
  min: oneOfType([
    string,
    number,
  ]),
  max: oneOfType([
    string,
    number,
  ]),
}));

export default keys;
