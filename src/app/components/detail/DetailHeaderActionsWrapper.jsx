import React from 'react';

import PropTypes from 'prop-types';
import dataItemType from '../types/dataItem';

import { MAIN_PATH } from '../../../../config/constants';

import { historyPush } from '../../../global/utils/UrlHelpers';

import I18n from '../../utils/I18n';

import DetailHeaderActions from './DetailHeaderActions';

const DetailHeaderActionsWrapper = ({
  item, deleteData, ...otherProps
}) => {
  const handleEditData = () => {
    historyPush(`${MAIN_PATH}/${item.id}/edit`);
  };

  const handleDeleteData = () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(I18n.t('en.data.confirmDelete'));
    if (confirm) deleteData({ id: item.id });
  };

  return (
    <DetailHeaderActions
      {...otherProps}
      item={item}
      handleEditData={handleEditData}
      handleDeleteData={handleDeleteData}
    />
  );
};

export default DetailHeaderActionsWrapper;

DetailHeaderActionsWrapper.propTypes = {
  item: dataItemType,
  deleteData: PropTypes.func,
};

DetailHeaderActionsWrapper.defaultProps = {
  item: null,
  deleteData: () => {},
};
