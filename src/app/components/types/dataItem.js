import {
  shape,
  number,
  string,
} from 'prop-types';

const dataItem = shape({
  id: number,
  name: string,
  fat: number,
  protein: number,
  calories: number,
  status: string,
  createdBy: string,
  createdAt: string,
  updatedBy: string,
  updatedAt: string,
});

export default dataItem;
