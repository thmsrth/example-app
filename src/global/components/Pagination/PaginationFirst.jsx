import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../utils/ClassNameHelpers';

import PaginationTab from './PaginationTab';

import './PaginationFirst.css';

const PaginationFirst = ({
  className, totalPages, pageNumber, onPageNumberChange,
}) => {
  if (totalPages > 1 && pageNumber > 0) {
    return (
      <div className={`PaginationFirst ${className}`}>
        <div className={bemCls(`PaginationFirst ${className}`, '__container')}>
          <PaginationTab
            className={bemCls(`PaginationFirst ${className}`, 'Tab')}
            currentPageNumber={0}
            pageNumber={pageNumber}
            onPageNumberChange={onPageNumberChange}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default PaginationFirst;

PaginationFirst.propTypes = {
  className: PropTypes.string,
  totalPages: PropTypes.number,
  pageNumber: PropTypes.number,
  onPageNumberChange: PropTypes.func,
};

PaginationFirst.defaultProps = {
  className: '',
  totalPages: 0,
  pageNumber: 0,
  onPageNumberChange: () => {},
};
