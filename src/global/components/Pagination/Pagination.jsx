import React from 'react';

import PropTypes from 'prop-types';
import paginationType from './types/pagination';
import paginationDefaults from './defaults/pagination';

import I18n from '../../utils/I18nGlobal';
import { bemCls } from '../../utils/ClassNameHelpers';

import InputSelect from '../Inputs/InputSelect';

import PaginationPrev from './PaginationPrev';
import PaginationFirst from './PaginationFirst';
import PaginationTab from './PaginationTab';
import PaginationLast from './PaginationLast';
import PaginationNext from './PaginationNext';

import './Pagination.css';

const Pagination = ({
  className, dataPagination, sizeOptions, sizeTitle, onSizeChange, onPageNumberChange,
}) => {
  if (dataPagination) {
    const {
      number, size, totalPages, totalElements,
    } = dataPagination;
    return (
      <div className={`Pagination ${className}`}>
        <div className={bemCls(`Pagination ${className}`, '__container')}>
          <div className={bemCls(`Pagination ${className}`, 'Size')}>
            <InputSelect
              className={bemCls(`Pagination ${className}`, 'Size__select')}
              label={sizeTitle}
              options={sizeOptions.map(option => ({
                label: option.toString(),
                value: option,
              }))}
              value={size}
              onChange={onSizeChange}
            />
          </div>
          <div className={bemCls(`Pagination ${className}`, 'Total')}>
            <div className={bemCls(bemCls(`Pagination ${className}`, 'Total'), '__text')}>
              {I18n.t('en.pagination.total', { count: totalElements })}
            </div>
          </div>
          <div className={bemCls(`Pagination ${className}`, '__tabs')}>
            <PaginationFirst
              className={bemCls(className, 'First')}
              pageNumber={number}
              totalPages={totalPages}
              onPageNumberChange={onPageNumberChange}
            />
            <PaginationPrev
              className={bemCls(className, 'Previous')}
              pageNumber={number}
              totalPages={totalPages}
              onPageNumberChange={onPageNumberChange}
            />
            <PaginationTab
              className={bemCls(className, 'Tab')}
              currentPageNumber={number}
              pageNumber={number}
              onPageNumberChange={onPageNumberChange}
            />
            <PaginationNext
              className={bemCls(className, 'Next')}
              pageNumber={number}
              totalPages={totalPages}
              onPageNumberChange={onPageNumberChange}
            />
            <PaginationLast
              className={bemCls(className, 'Last')}
              pageNumber={number}
              totalPages={totalPages}
              onPageNumberChange={onPageNumberChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Pagination;

Pagination.propTypes = {
  className: PropTypes.string,
  dataPagination: paginationType,
  sizeOptions: PropTypes.arrayOf(PropTypes.number),
  sizeTitle: PropTypes.string,
  onSizeChange: PropTypes.func,
  onPageNumberChange: PropTypes.func,
};

Pagination.defaultProps = {
  className: '',
  dataPagination: paginationDefaults,
  sizeOptions: [25, 50, 75, 100],
  sizeTitle: '',
  onSizeChange: () => {},
  onPageNumberChange: () => {},
};
