import React from 'react';

import PropTypes from 'prop-types';
import filtersValuesType from '../Filter/types/filtersValues';

import { getItemById } from '../../utils/FormatHelpers';
import { updateUrlQueryParams } from '../../utils/UrlHelpers';
import I18nGlobal from '../../utils/I18nGlobal';

import NotFound from '../../security/components/NotFound';
import DataStateNotifier from '../DataStateNotifier';

class ItemFetcher extends React.Component {
  componentDidMount() {
    const {
      id, dataPageSize, dataPageNumber,
      dataSortParam, dataFilters, data, fetchDataById,
    } = this.props;

    if (!Number.isNaN(id)) {
      const item = getItemById(id, data);

      if (!item) {
        const defaultParams = {
          size: dataPageSize,
          page: dataPageNumber,
          sort: dataSortParam,
          ...dataFilters,
        };
        const queryParams = updateUrlQueryParams({ id }, defaultParams);

        fetchDataById(queryParams);
      }
    }
  }

  render() {
    const {
      id, data, dataLoading, dataError, resetDataError, children,
    } = this.props;
    const item = getItemById(id, data);

    if (item) {
      return React.Children.map(children, child => React.cloneElement(child, {
        item,
        dataLoading,
        dataError,
        resetDataError,
      }));
    }

    return (
      <DataStateNotifier
        dataLoading={dataLoading}
        dataError={dataError}
        resetDataError={resetDataError}
      >
        <NotFound
          message={I18nGlobal.t('en.route.notFound')}
          loading={dataLoading}
        />
      </DataStateNotifier>
    );
  }
}

export default ItemFetcher;

ItemFetcher.propTypes = {
  dataPageSize: PropTypes.number,
  dataPageNumber: PropTypes.number,
  dataSortParam: PropTypes.string,
  dataFilters: filtersValuesType,
  dataLoading: PropTypes.string,
  dataError: PropTypes.string,
  resetDataError: PropTypes.func,
  fetchDataById: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  id: PropTypes.number,
  children: PropTypes.node,
};

ItemFetcher.defaultProps = {
  dataPageSize: 25,
  dataPageNumber: 0,
  dataSortParam: 'id,ASC',
  dataFilters: {},
  dataLoading: '',
  dataError: '',
  resetDataError: () => {},
  fetchDataById: () => {},
  id: undefined,
  data: [],
  children: null,
};
