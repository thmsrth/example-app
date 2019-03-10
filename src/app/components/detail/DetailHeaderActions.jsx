import React from 'react';

import PropTypes from 'prop-types';

import Button from '../../../global/components/Button';

import { canBeDeleted } from '../../utils/BusinessLogic';

import I18n from '../../utils/I18n';
import SecurityUtil from '../../../global/security/utils/SecurityUtil';

import dataItem from '../types/dataItem';

import './DetailHeaderActions.css';

const DetailHeaderActions = ({
  handleEditData, handleDeleteData, dataDeleting, item,
}) => (
  <div className="DetailHeaderActions">
    <div className="DetailHeaderActions__container">
      <Button
        className="DetailHeaderActions__button"
        text={I18n.t('en.actions.disabled')}
        iconName="beer"
        onClick={() => {}}
        disabled
      />

      <Button
        className="DetailHeaderActions__button"
        text={I18n.t('en.actions.edit')}
        iconName="edit"
        onClick={handleEditData}
        disabled={!SecurityUtil.isGranted('EXAMPLE_EDIT')}
      />

      {canBeDeleted(item) && (
        <Button
          className="DetailHeaderActions__button DetailHeaderActions__button__delete"
          text={I18n.t('en.actions.delete')}
          iconName="trash"
          onClick={handleDeleteData}
          loading={dataDeleting !== ''}
          disabled={!SecurityUtil.isGranted('EXAMPLE_DELETE')}
        />
      )}
    </div>
  </div>
);

export default DetailHeaderActions;

DetailHeaderActions.propTypes = {
  handleEditData: PropTypes.func,
  handleDeleteData: PropTypes.func,
  dataDeleting: PropTypes.string,
  item: dataItem,
};

DetailHeaderActions.defaultProps = {
  handleEditData: () => {},
  handleDeleteData: () => {},
  dataDeleting: '',
  item: null,
};
