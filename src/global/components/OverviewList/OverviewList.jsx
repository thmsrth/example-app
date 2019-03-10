import React from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import { bemCls } from '../../utils/ClassNameHelpers';

import OverviewListHead from './OverviewListHead';
import OverviewListItem from './OverviewListItem';

import './OverviewList.css';

const OverviewList = ({
  items, keys, activeKey, sortOrder, className, activeItemId, hideHeader, secondary,
  handleListHeaderClick, ...otherProps
}) => (
  <div className={`OverviewList ${bemCls(className, '__list')}`}>
    <table className={bemCls(`OverviewList ${className}`, '__table')}>
      {!hideHeader
        && (
        <thead className={bemCls(`OverviewList ${className}`, '__thead')}>
          <tr className={bemCls(`OverviewList ${className}`, '__tr')}>
            {keys.map(key => (
              <th
                key={key.name}
                className={`${bemCls(`OverviewList ${className}`, '__th')} ${
                  bemCls(bemCls(`OverviewList ${className}`, 'Head'), `__${key.name}`)}`}
              >
                <OverviewListHead
                  keyProp={key}
                  isActive={activeKey === key.name}
                  sortOrder={sortOrder}
                  className={bemCls(className, 'Head')}
                  handleListHeaderClick={handleListHeaderClick}
                />
              </th>
            ))}
          </tr>
        </thead>
        )
      }
      <tbody className={bemCls(`OverviewList ${className}`, '__tbody')}>
        {items.map((item) => {
          const id = item.id || item.uuid;
          if (item && id) {
            return (
              <OverviewListItem
                {...otherProps}
                key={id}
                item={item}
                keys={keys}
                className={bemCls(className, 'Item')}
                isActive={activeItemId === id}
                hideHeader={hideHeader}
                secondary={secondary}
              />
            );
          }
          return null;
        })}
      </tbody>
    </table>
  </div>
);

export default OverviewList;

OverviewList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object),
  keys: PropTypes.arrayOf(keyType),
  activeKey: PropTypes.string,
  sortOrder: PropTypes.string,
  className: PropTypes.string,
  activeItemId: PropTypes.number,
  hideHeader: PropTypes.bool,
  secondary: PropTypes.bool,
  handleListHeaderClick: PropTypes.func,
};

OverviewList.defaultProps = {
  items: [],
  keys: [],
  activeKey: '',
  sortOrder: 'ASC',
  className: '',
  activeItemId: -1,
  hideHeader: false,
  secondary: false,
  handleListHeaderClick: () => {},
};
