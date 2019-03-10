import React from 'react';

import I18n from '../../utils/I18n';
import ItemFetcher from '../../../global/components/ItemFetcher';
import { getRouteParams } from '../../../global/utils/UrlHelpers';

import ExampleFormContainer from './example/ExampleFormContainer';

const EditExamplePage = (props) => {
  const id = getRouteParams(props, 'id', 'number');

  return (
    <ItemFetcher {...props} id={id}>
      <ExampleFormContainer
        {...props}
        id={id}
        action="edit"
        title={`${I18n.t('en.actions.edit')} ${I18n.t('en.data.entity')}`}
      />
    </ItemFetcher>
  );
};

export default EditExamplePage;
