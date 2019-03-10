import {
  shape,
  bool,
  number,
  string,
  func,
  arrayOf,
  objectOf,
  oneOfType,
} from 'prop-types';

const key = shape({
  name: string,
  title: string,
  type: string,
  format: string,
  translationPath: objectOf(string),
  options: arrayOf(objectOf(oneOfType([
    string,
    number,
    bool,
    func,
  ]))),
  required: bool,
});

export default key;
