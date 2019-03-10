import {
  shape,
  number,
} from 'prop-types';

const pagination = shape({
  size: number,
  totalElements: number,
  totalPages: number,
  number,
  numberOfElements: number,
});

export default pagination;
