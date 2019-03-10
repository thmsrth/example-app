import React from 'react';

import { MAIN_PATH } from '../../../../config/constants';

import { historyPush } from '../../../global/utils/UrlHelpers';
import Button from '../../../global/components/Button';

import I18n from '../../utils/I18n';
import SecurityUtil from '../../../global/security/utils/SecurityUtil';

import './MasterActions.css';

const MasterActions = () => (
  <div className="MasterActions">
    <div className="MasterActions__container">
      <Button
        className="MasterActions__button"
        text={I18n.t('en.actions.create')}
        iconName="plus"
        onClick={() => historyPush(`${MAIN_PATH}/create`)}
        disabled={!SecurityUtil.isGranted('EXAMPLE_CREATE')}
      />
    </div>
  </div>
);

export default MasterActions;
