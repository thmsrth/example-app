import React from 'react';

import dataItemType from '../types/dataItem';

import DetailsList from '../../../global/components/DetailsList/DetailsList';

import I18n from '../../utils/I18n';

import './DetailInfos.css';

const DetailInfos = ({ item }) => {
  const keys = [
    {
      name: 'id',
      title: `${I18n.t('en.data.attribute.id.title')}:`,
      type: 'number',
    },
    {
      name: 'name',
      title: `${I18n.t('en.data.attribute.name.title')}:`,
      type: 'number',
    },
    {
      name: 'fat',
      title: I18n.t('en.data.attribute.fat.title'),
      type: 'number',
    },
    {
      name: 'protein',
      title: I18n.t('en.data.attribute.protein.title'),
      type: 'number',
    },
    {
      name: 'calories',
      title: I18n.t('en.data.attribute.calories.title'),
      type: 'number',
    },
    {
      name: 'status',
      title: I18n.t('en.data.attribute.status.title'),
      type: 'text',
    },
    {
      name: 'createdAt',
      title: I18n.t('en.data.attribute.createdAt.title'),
      type: 'datetime',
      format: 'DD/MM/YYYY HH:mm',
    },
    {
      name: 'createdBy',
      title: I18n.t('en.data.attribute.createdBy.title'),
      type: 'text',
    },
    {
      name: 'updatedAt',
      title: I18n.t('en.data.attribute.updatedAt.title'),
      type: 'datetime',
      format: 'DD/MM/YYYY HH:mm',
    },
    {
      name: 'updatedBy',
      title: I18n.t('en.data.attribute.updatedBy.title'),
      type: 'text',
    },
  ];

  if (item && item.id) {
    return (
      <div className="DetailInfos">
        <div className="DetailInfos__container">
          <div className="DetailInfos__header">
            <h3 className="DetailInfos__title">
              {I18n.t('en.data.infos.title')}
            </h3>
          </div>
          <DetailsList
            item={item}
            keys={keys}
            className="DetailInfos"
          />
        </div>
      </div>
    );
  }
  return null;
};

export default DetailInfos;

DetailInfos.propTypes = {
  item: dataItemType,
};

DetailInfos.defaultProps = {
  item: null,
};
