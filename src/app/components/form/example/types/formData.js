import {
  shape,
  number,
  string,
} from 'prop-types';

const formData = shape({
  customerId: number,
  referenceId: string,
  startOfContract: string,
  endOfContract: string,
  type: string,
  periodType: string,
  bookingType: string,
});

export default formData;
