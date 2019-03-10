import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../utils/ClassNameHelpers';

import Button from '../Button';

import './PaginationTab.css';

const PaginationTab = ({
  className, currentPageNumber, pageNumber, onPageNumberChange,
}) => (
  <Button
    className={`Pagination__tab ${className} ${
      bemCls(`Pagination__tab ${className}`, '--active', currentPageNumber === pageNumber)}`}
    text={`${currentPageNumber + 1}`}
    params={{ pageNumber: currentPageNumber }}
    onClick={onPageNumberChange}
  />
);

export default PaginationTab;

PaginationTab.propTypes = {
  className: PropTypes.string,
  pageNumber: PropTypes.number,
  currentPageNumber: PropTypes.number,
  onPageNumberChange: PropTypes.func,
};

PaginationTab.defaultProps = {
  className: '',
  pageNumber: 0,
  currentPageNumber: 0,
  onPageNumberChange: () => {},
};
