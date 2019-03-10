import {
  shape,
  number,
  string,
} from 'prop-types';

const language = shape({
  language_code: string,
  language_name: string,
  percentage: number,
});

export default language;
