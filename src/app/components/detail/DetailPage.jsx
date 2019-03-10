import React from 'react';

import ItemFetcher from '../../../global/components/ItemFetcher';
import { getRouteParams } from '../../../global/utils/UrlHelpers';

import DetailContainer from './DetailContainer';

const DetailPage = (props) => {
  const id = getRouteParams(props, 'id', 'number');

  return (
    <ItemFetcher {...props} id={id}>
      <DetailContainer
        {...props}
        id={id}
      />
    </ItemFetcher>
  );
};

export default DetailPage;
