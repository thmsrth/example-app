import React from 'react';
import PropTypes from 'prop-types';

import I18n from '../../utils/I18nGlobal';
import { bemCls } from '../../utils/ClassNameHelpers';

import Button from '../Button';

import './PaginationNext.css';

const PaginationNext = ({
  className, totalPages, pageNumber, onPageNumberChange,
}) => {
  if (totalPages > 1 && pageNumber + 1 < totalPages) {
    return (
      <Button
        className={bemCls(`PaginationNext ${className}`, '__button')}
        text={I18n.t('en.pagination.next')}
        params={{ pageNumber: pageNumber + 1 }}
        onClick={onPageNumberChange}
      />
    );
  }
  return null;
};

export default PaginationNext;

PaginationNext.propTypes = {
  className: PropTypes.string,
  totalPages: PropTypes.number,
  pageNumber: PropTypes.number,
  onPageNumberChange: PropTypes.func,
};

PaginationNext.defaultProps = {
  className: '',
  totalPages: 0,
  pageNumber: 0,
  onPageNumberChange: () => {},
};
