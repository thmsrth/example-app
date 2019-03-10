import React from 'react';

import PropTypes from 'prop-types';
import dataItemType from '../types/dataItem';

import { MAIN_PATH } from '../../../../config/constants';

import paginationType from '../../../global/components/Pagination/types/pagination';
import paginationDefaults from '../../../global/components/Pagination/defaults/pagination';
import { historyPush } from '../../../global/utils/UrlHelpers';
import OverviewList from '../../../global/components/OverviewList';

import I18n from '../../utils/I18n';
import SecurityUtil from '../../../global/security/utils/SecurityUtil';

import './MasterList.css';

const MasterList = ({
  data, dataLoading, dataSort, dataPagination,
  fetchSortedItems, updateSortQueryParams,
}) => {
  const keys = [
    {
      name: 'id',
      title: I18n.t('en.data.attribute.id.title'),
      type: 'number',
    },
    {
      name: 'name',
      title: I18n.t('en.data.attribute.name.title'),
      type: 'text',
    },
    {
      name: 'nutritionalInformation',
      title: I18n.t('en.data.attribute.nutritionalInformation.title'),
      type: 'box',
      options: [
        {
          name: 'fat',
          title: `${I18n.t('en.data.attribute.fat.title')}:`,
          type: 'number',
        },
        {
          name: 'protein',
          title: `${I18n.t('en.data.attribute.protein.title')}:`,
          type: 'number',
        },
        {
          name: 'calories',
          title: `${I18n.t('en.data.attribute.calories.title')}:`,
          type: 'number',
        },
      ],
    },
    {
      name: 'status',
      title: I18n.t('en.data.attribute.status.title'),
      type: 'text',
    },
    {
      name: 'createdAt', title: 'Created At', type: 'datetime', format: 'DD/MM/YYYY HH:mm',
    },
    {
      name: 'createdBy', title: 'Created by', type: 'text',
    },
    {
      name: 'updatedAt', title: 'Updated At', type: 'datetime', format: 'DD/MM/YYYY HH:mm',
    },
    {
      name: 'updatedBy', title: 'Updated by', type: 'text',
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'box',
      options: [
        {
          name: 'detail',
          title: '',
          type: 'action',
          actionParams: ['id'],
          condition: SecurityUtil.isGranted('EXAMPLE_DETAIL'),
          icon: 'search',
        },
      ],
    },
  ];

  if (data && !dataLoading) {
    const actionHandlers = {
      detail: params => historyPush(`${MAIN_PATH}/${params.id}`),
    };
    return (
      <div className="MasterList">
        <div className="MasterList__container">
          {data.length
            ? (
              <OverviewList
                items={data}
                keys={keys}
                handlers={actionHandlers}
                className="MasterList"
                sortedKey={dataSort && dataSort.property}
                sortOrder={dataSort && dataSort.direction}
                fetchSortedItems={fetchSortedItems}
                updateSortQueryParams={updateSortQueryParams}
                serverSidedSorting={dataPagination.totalElements > dataPagination.size}
              />
            )
            : (
              <div className="MasterList__list MasterList__list--empty">
                <h4 className="MasterList__states">
                  {I18n.t('en.data.states.empty')}
                </h4>
              </div>
            )
          }
        </div>
      </div>
    );
  }
  return null;
};

export default MasterList;

MasterList.propTypes = {
  data: PropTypes.arrayOf(dataItemType),
  dataSort: PropTypes.shape({
    property: PropTypes.string,
    direction: PropTypes.string,
  }),
  dataPagination: paginationType,
  dataLoading: PropTypes.string,
  fetchSortedItems: PropTypes.func,
  updateSortQueryParams: PropTypes.func,
};

MasterList.defaultProps = {
  data: [],
  dataSort: {
    property: 'createdAt',
    direction: 'DESC',
  },
  dataPagination: paginationDefaults,
  dataLoading: '',
  fetchSortedItems: () => {},
  updateSortQueryParams: undefined,
};
