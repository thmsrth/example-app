import {
  shape,
  number,
  bool,
  string,
  arrayOf,
  oneOfType,
} from 'prop-types';

const filter = shape({
  name: string,
  title: string,
  type: string,
  range: bool,
  htmlPattern: string,
  placeholder: string,
  options: arrayOf(shape({
    value: oneOfType([
      string,
      number,
    ]),
    label: string,
  })),
  optionsFromData: string,
});

export default filter;
