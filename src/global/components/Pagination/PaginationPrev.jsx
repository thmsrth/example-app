import React from 'react';
import PropTypes from 'prop-types';

import I18n from '../../utils/I18nGlobal';
import { bemCls } from '../../utils/ClassNameHelpers';

import Button from '../Button';

import './PaginationPrev.css';

const PaginationPrev = ({
  className, totalPages, pageNumber, onPageNumberChange,
}) => {
  if (totalPages > 1 && pageNumber > 0) {
    return (
      <Button
        className={bemCls(`PaginationPrev ${className}`, '__button')}
        text={I18n.t('en.pagination.prev')}
        params={{ pageNumber: pageNumber - 1 }}
        onClick={onPageNumberChange}
      />
    );
  }
  return null;
};

export default PaginationPrev;

PaginationPrev.propTypes = {
  className: PropTypes.string,
  totalPages: PropTypes.number,
  pageNumber: PropTypes.number,
  onPageNumberChange: PropTypes.func,
};

PaginationPrev.defaultProps = {
  className: '',
  totalPages: 0,
  pageNumber: 0,
  onPageNumberChange: () => {},
};
