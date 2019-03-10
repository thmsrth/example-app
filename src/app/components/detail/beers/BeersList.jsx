import React from 'react';
import PropTypes from 'prop-types';

import OverviewList from '../../../../global/components/OverviewList';

import I18n from '../../../utils/I18n';

import dataItemType from '../../types/dataItem';

const BeersList = ({
  beers,
}) => {
  const keys = [
    {
      name: 'name', title: 'Name:', type: 'text',
    },
    {
      name: 'first_brewed', title: 'First brewed:', type: 'text',
    },
    {
      name: 'image_url', title: 'Image:', type: 'image', format: 'xs',
    },
    {
      name: 'description', title: 'Description:', type: 'text',
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'box',
      options: [
        {
          name: 'drink',
          type: 'action',
          actionParams: ['id'],
          condition: true,
          icon: 'beer',
          tooltip: I18n.t('en.actions.drink'),
        },
      ],
    },
  ];

  const handleDeleteUnits = () => {
    // eslint-disable-next-line no-alert
    window.confirm(I18n.t('en.data.confirmDrink'));
  };

  if (beers && beers.length > 0) {
    const actionsHandlers = {
      drink: params => handleDeleteUnits(params.id),
    };

    return (
      <OverviewList
        className="BeersList"
        handlers={actionsHandlers}
        items={beers}
        keys={keys}
        secondary
      />
    );
  }
  return null;
};

export default BeersList;

BeersList.propTypes = {
  beers: PropTypes.arrayOf(dataItemType),
};

BeersList.defaultProps = {
  beers: [],
};
