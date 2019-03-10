import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../utils/ClassNameHelpers';

import PaginationTab from './PaginationTab';

import './PaginationLast.css';

const PaginationLast = ({
  className, totalPages, pageNumber, onPageNumberChange,
}) => {
  if (totalPages > 1 && pageNumber < totalPages - 1) {
    return (
      <div className={`PaginationLast ${className}`}>
        <div className={bemCls(`PaginationLast ${className}`, '__container')}>
          <PaginationTab
            className={bemCls(`PaginationLast ${className}`, 'Tab')}
            currentPageNumber={totalPages - 1}
            pageNumber={pageNumber}
            onPageNumberChange={onPageNumberChange}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default PaginationLast;

PaginationLast.propTypes = {
  className: PropTypes.string,
  totalPages: PropTypes.number,
  pageNumber: PropTypes.number,
  onPageNumberChange: PropTypes.func,
};

PaginationLast.defaultProps = {
  className: '',
  totalPages: 0,
  pageNumber: 0,
  onPageNumberChange: () => {},
};
