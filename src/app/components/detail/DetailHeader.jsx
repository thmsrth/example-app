import React from 'react';

import PropTypes from 'prop-types';
import filtersValuesType from '../../../global/components/Filter/types/filtersValues';
import dataItemType from '../types/dataItem';

import { MAIN_PATH } from '../../../../config/constants';

import { historyPush } from '../../../global/utils/UrlHelpers';
import Button from '../../../global/components/Button';

import I18n from '../../utils/I18n';

import DetailHeaderActionsWrapper from './DetailHeaderActionsWrapper';

import './DetailHeader.css';

const DetailHeader = ({
  item, dataPageSize, dataPageNumber, dataSortParam, dataFilters, ...otherProps
}) => {
  if (item) {
    const queryParams = {
      size: dataPageSize,
      page: dataPageNumber,
      sort: dataSortParam,
      ...dataFilters,
    };
    const { referenceId } = item;

    return (
      <div className="DetailHeader">
        <div className="DetailHeader__container">
          <div className="DetailHeader__header">
            <div className="DetailHeaderBack">
              <Button
                className="DetailHeaderBack__button"
                iconName="arrow-circle-left"
                text={I18n.t('en.actions.back')}
                onClick={() => historyPush(MAIN_PATH, queryParams)}
              />
            </div>
            <h2 className="DetailHeader__title">
              {referenceId}
            </h2>
          </div>
          <div className="DetailHeader__actions">
            <DetailHeaderActionsWrapper
              item={item}
              {...otherProps}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default DetailHeader;

DetailHeader.propTypes = {
  item: dataItemType,
  dataPaginationSize: PropTypes.number,
  dataPaginationOffset: PropTypes.number,
  dataSortParam: PropTypes.string,
  dataFilters: filtersValuesType,
};

DetailHeader.defaultProps = {
  item: {},
  dataPaginationSize: 25,
  dataPaginationOffset: 0,
  dataSortParam: 'id,ASC',
  dataFilters: {},
};
