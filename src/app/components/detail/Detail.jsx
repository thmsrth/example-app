import React from 'react';

import dataItemType from '../types/dataItem';

import DataStateNotifier from '../../../global/components/DataStateNotifier';

import DetailHeader from './DetailHeader';
import DetailInfos from './DetailInfos';

import BeersBox from './beers/BeersBox';

import './Detail.css';

const Detail = ({
  item, dataUpdating, ...otherProps
}) => {
  if (item) {
    return (
      <DataStateNotifier
        {...otherProps}
      >
        <div className="Detail">
          <DetailHeader
            {...otherProps}
            item={item}
          />
          <div className="Detail__container">
            <div className="Detail__dashboard">
              <DetailInfos
                {...otherProps}
                item={item}
              />
              <BeersBox
                {...otherProps}
                item={item}
              />
            </div>
          </div>
        </div>
      </DataStateNotifier>
    );
  }
  return null;
};

export default Detail;

Detail.propTypes = {
  item: dataItemType,
};

Detail.defaultProps = {
  item: {},
};
