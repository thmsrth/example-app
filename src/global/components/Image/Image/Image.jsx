import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../../utils/ClassNameHelpers';
import I18nGlobal from '../../../utils/I18nGlobal';

import Button from '../../Button';

import './Image.css';

const Image = ({ image, className }) => {
  const {
    path,
    name,
    label,
    deleteOptions,
  } = image;

  const {
    showDelete,
    deleteAction,
    deleteCondition,
  } = deleteOptions || {};

  return (
    <div className={bemCls(`Image ${className}`, '__wrapper')}>
      {label
      && (
        <label className={bemCls(`Image ${className}`, '__label')}>
          {label}
        </label>
      )}
      <div className={bemCls(`Image ${className}`, '__container')}>
        {path
          ? <img src={path} alt={name} className={bemCls(`Image ${className}`, '__image')} />
          : I18nGlobal.t('en.image.states.noImage')
        }
        {showDelete
        && (
          <Button
            tooltip={I18nGlobal.t('en.actions.delete')}
            iconName="trash"
            className={bemCls(`Image ${className}`, '__delete')}
            onClick={deleteAction}
            disabled={deleteCondition !== undefined && !deleteCondition}
          />
        )}
      </div>
    </div>
  );
};

export default Image;

Image.propTypes = {
  image: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    deleteOptions: PropTypes.shape({
      showDelete: PropTypes.bool,
      deleteAction: PropTypes.func,
      deleteCondition: PropTypes.bool,
    }),
  }),
  className: PropTypes.string,
};

Image.defaultProps = {
  image: {
    path: '',
    label: '',
    name: '',
    deleteOptions: {
      showDelete: false,
      deleteAction: () => {},
      deleteCondition: false,
    },
  },
  className: '',
};
