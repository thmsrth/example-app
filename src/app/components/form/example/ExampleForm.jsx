import React from 'react';

import PropTypes from 'prop-types';
import formDataType from './types/formData';
import languageType from '../../types/language';

import currencies from '../../../static/currencies.json';

import I18n from '../../../utils/I18n';

import Button from '../../../../global/components/Button/Button';
import Form from '../../../../global/components/Form';
import { getSelectOptionsFromData } from '../../../../global/utils/FormatHelpers';
import { sortObjectMethod } from '../../../../global/utils/SortHelpers';
import DataStateNotifier from '../../../../global/components/DataStateNotifier';

import './ExampleForm.css';

const ExampleForm = ({
  action, title, formData, submitParams, handleSubmit, handleCancel,
  languages, languagesLoading, languagesError,
  handleLanguageTextChange, ...otherProps
}) => {
  const { dataAdding, dataUpdating } = otherProps;

  const actionKeys = [
    {
      name: 'name',
      title: I18n.t('en.data.attribute.name.title'),
      type: 'text',
      required: true,
      validationAlert: I18n.t('en.form.validationAlert'),
    },
    {
      name: 'status',
      title: I18n.t('en.data.attribute.status.title'),
      type: 'select',
      required: true,
      clearable: true,
      validationAlert: I18n.t('en.form.validationAlert'),
      options: [
        {
          label: 'Healthy',
          value: 'HEALTHY',
        },
        {
          label: 'Unhealthy',
          value: 'UNHEALTHY',
        },
      ],
    },
    {
      name: 'text',
      title: I18n.t('en.data.attribute.text.title'),
      type: 'textarea',
      required: true,
      validationAlert: I18n.t('en.form.validationAlert'),
      onChange: handleLanguageTextChange,
    },
    {
      name: 'language',
      title: I18n.t('en.data.attribute.language.title'),
      type: 'select',
      required: true,
      validationAlert: I18n.t('en.form.validationAlert'),
      optionsFromDataKey: 'languages',
    },
    {
      name: 'priceAmount',
      title: I18n.t('en.data.attribute.priceAmount.title'),
      type: 'number',
      required: true,
      pattern: I18n.t('en.data.attribute.priceAmount.pattern'),
      validationAlert: I18n.t('en.data.attribute.priceAmount.validationAlert'),
      step: '0.01',
      min: 0,
    },
    {
      name: 'priceCurrencyCode',
      title: I18n.t('en.data.attribute.priceCurrencyCode.title'),
      type: 'select',
      required: true,
      searchable: true,
      validationAlert: I18n.t('en.form.validationAlert'),
      optionsFromDataKey: 'currencies',
    },
    {
      name: 'multiselect',
      title: I18n.t('en.data.attribute.multiselect.title'),
      type: 'multiselect',
      clearable: true,
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
      ],
    },
    {
      name: 'checkbox',
      title: I18n.t('en.data.attribute.checkbox.title'),
      type: 'checkbox',
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
      ],
    },
    {
      name: 'radio',
      title: I18n.t('en.data.attribute.radio.title'),
      type: 'radio',
      clearable: true,
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
      ],
    },
    {
      name: 'collection',
      title: I18n.t('en.data.attribute.collection.title'),
      type: 'collection',
      fields: [
        {
          name: 'phone',
          title: I18n.t('en.data.attribute.collection.fields.phone.title'),
          type: 'text',
          required: true,
          pattern: I18n.t('en.data.attribute.collection.fields.phone.pattern'),
          validationAlert: I18n.t('en.data.attribute.collection.fields.phone.validationAlert'),
        },
        {
          name: 'date',
          title: I18n.t('en.data.attribute.collection.fields.date.title'),
          type: 'date',
        },
      ],
    },
  ];

  const keys = action === 'create'
    ? actionKeys
    : actionKeys.slice(0, 2);

  const formatData = data => ({ ...data });

  return (
    <DataStateNotifier {...otherProps}>
      <div className="ExampleForm">
        <div className="ExampleForm__header">
          <h3 className="ExampleForm__title">{title}</h3>
          <div className="ExampleForm__actions">
            <Button
              className="ExampleForm__close"
              iconName="remove"
              onClick={handleCancel}
            />
          </div>
        </div>
        <div className="ExampleForm__container">
          <Form
            loading={dataAdding || dataUpdating}
            action={action}
            keys={keys}
            data={formData}
            className="ExampleForm"
            title={title}
            submitParams={submitParams}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            formatData={data => formatData(data)}
            optionsFromData={{
              languages: {
                data: [
                  ...getSelectOptionsFromData(
                    languages,
                    ['language_name', 'percentage'],
                    'language_code',
                    { separator: ', Percentage: ' },
                  ),
                ],
                loading: languagesLoading,
                error: languagesError,
              },
              currencies: {
                data: [
                  ...getSelectOptionsFromData(
                    currencies.sort(sortObjectMethod('code', 'ASC')),
                    ['code', 'name'],
                    'code',
                    { separator: ', ' },
                  ),
                ],
              },
            }}
          />
        </div>
      </div>
    </DataStateNotifier>
  );
};

export default ExampleForm;

ExampleForm.propTypes = {
  action: PropTypes.string,
  title: PropTypes.string,
  formData: formDataType,
  // eslint-disable-next-line react/forbid-prop-types
  submitParams: PropTypes.object,
  dataError: PropTypes.string,
  dataAdding: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  resetDataError: PropTypes.func,
  handleLanguageTextChange: PropTypes.func,
  languages: PropTypes.arrayOf(languageType),
  languagesLoading: PropTypes.string,
  languagesError: PropTypes.string,
};

ExampleForm.defaultProps = {
  action: 'create',
  title: '',
  formData: null,
  submitParams: {},
  dataError: '',
  dataAdding: '',
  handleSubmit: () => {},
  handleCancel: () => {},
  resetDataError: () => {},
  handleLanguageTextChange: () => {},

  languages: [],
  languagesLoading: '',
  languagesError: '',
};
