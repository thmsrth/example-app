import React from 'react';

import PropTypes from 'prop-types';
import paginationType from '../../../global/components/Pagination/types/pagination';
import paginationDefaults from '../../../global/components/Pagination/defaults/pagination';
import dataItemType from '../types/dataItem';

import Pagination from '../../../global/components/Pagination';
import { sortObjectMethod } from '../../../global/utils/SortHelpers';

import './MasterPagination.css';

const MasterPagination = ({
  data, dataPagination, dataPageSize, dataSortParam,
  onPageNumberChange, onSizeChange,
}) => {
  const getPaginationSizeOptions = (paginationSize) => {
    const defaultSizeOptions = [25, 50, 75, 100];
    const sizeOptions = [...defaultSizeOptions];
    sizeOptions.unshift(paginationSize);
    sizeOptions.sort(sortObjectMethod('', 'ASC'));
    return [...new Set(sizeOptions)]; // unique values
  };

  if (data && data.length && dataPagination) {
    return (
      <Pagination
        className="MasterPagination"
        dataPagination={dataPagination}
        dataPaginationSize={dataPageSize}
        dataSortParam={dataSortParam}
        sizeOptions={getPaginationSizeOptions(dataPageSize)}
        onPageNumberChange={onPageNumberChange}
        onSizeChange={onSizeChange}
      />
    );
  }
  return null;
};

export default MasterPagination;

MasterPagination.propTypes = {
  data: PropTypes.arrayOf(dataItemType),
  dataPagination: paginationType,
  dataPageSize: PropTypes.number,
  dataSortParam: PropTypes.string,
  onPageNumberChange: PropTypes.func,
  onSizeChange: PropTypes.func,
};

MasterPagination.defaultProps = {
  data: [],
  dataPagination: paginationDefaults,
  dataPageSize: 25,
  dataSortParam: 'id,ASC',
  onPageNumberChange: () => {},
  onSizeChange: () => {},
};
