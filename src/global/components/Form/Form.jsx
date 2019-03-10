import React from 'react';

import PropTypes from 'prop-types';
import keysType from './types/keys';

import I18nGlobal from '../../utils/I18nGlobal';
import { bemCls } from '../../utils/ClassNameHelpers';
import { getFormInputField } from '../../utils/FormHelpers';

import Button from '../Button';

import './Form.css';

const Form = ({
  className, keys, data, action, readOnly,
  handleChange, handleBlur, handleSubmit, handleCancel, optionsFromData, loading,
}) => {
  if (data) {
    const isLoading = loading !== '';
    return (
      <form
        name={className}
        action={action}
        id={className}
        onSubmit={handleSubmit}
      >
        <fieldset disabled={isLoading} className={bemCls(`Form ${className}`, '__form')}>
          <div className={bemCls(`Form ${className}`, '__fields')}>
            {keys.map((key) => {
              if (key) {
                const inputData = data[key.name];
                if (inputData !== undefined) {
                  return getFormInputField(
                    key,
                    inputData,
                    className,
                    handleChange,
                    handleBlur,
                    optionsFromData,
                  );
                }
              }
              return null;
            })}
          </div>
          <div className={bemCls(`Form ${className}`, '__formActions')}>
            {!!handleCancel
              && (
                <Button
                  className={bemCls(`Form ${className}`, '__cancel')}
                  iconName="remove"
                  text={I18nGlobal.t('en.actions.cancel')}
                  onClick={handleCancel}
                  disabled={isLoading}
                />
              )
            }
            {!readOnly
              && (
              <Button
                className={`${bemCls(`Form ${className}`, '__submit')} ${
                  bemCls(`Form ${className}`, `__submit__${action}`)}`}
                iconName={action === 'send' ? action : 'check'}
                text={action
                  ? I18nGlobal.t(`en.actions.${action}`)
                  : I18nGlobal.t('en.actions.save')}
                type="submit"
                loading={isLoading}
              />
              )
            }
          </div>
        </fieldset>
      </form>
    );
  }
  return null;
};

export default Form;

Form.propTypes = {
  className: PropTypes.string,
  action: PropTypes.string,
  keys: keysType,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // eslint-disable-next-line react/forbid-prop-types
  optionsFromData: PropTypes.object,
  readOnly: PropTypes.bool,
  loading: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  handleBlur: PropTypes.func,
};

Form.defaultProps = {
  className: '',
  action: 'create',
  keys: [],
  data: null,
  optionsFromData: null,
  readOnly: false,
  loading: '',
  handleChange: () => {},
  handleSubmit: () => {},
  handleCancel: undefined,
  handleBlur: () => {},
};
