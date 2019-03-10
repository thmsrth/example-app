import React from 'react';

import I18n from '../../utils/I18n';
import ExampleFormContainer from './example/ExampleFormContainer';

const CreateExamplePage = props => (
  <ExampleFormContainer
    {...props}
    action="create"
    title={`${I18n.t('en.actions.create')} ${I18n.t('en.data.entity')}`}
  />
);

export default CreateExamplePage;
