import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

import { MAIN_PATH } from '../../../../../config/constants';

import { historyPush } from '../../../../global/utils/UrlHelpers';
import { getFormInputData } from '../../../../global/utils/FormHelpers';

import formDataType from './types/formData';
import ExampleForm from './ExampleForm';

class ExampleFormWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleLanguageTextChange = debounce(this.handleLanguageTextChange.bind(this), 1000);
  }

  updateLanguageDetection = (data, updateData, language) => {
    const newData = {
      ...data,
      language: getFormInputData({ language }, { name: 'language' }),
    };

    updateData(newData);
  };

  handleLanguageTextChange(text, data, updateData) {
    const { fetchLanguageDetection } = this.props;
    fetchLanguageDetection({ text, data, updateData }, this.updateLanguageDetection);
  }

  render() {
    const {
      dataPageSize, dataPageNumber, dataSortParam, dataFilters,
      createData, updateData, item, ...otherProps
    } = this.props;

    const { action } = otherProps;
    const queryParams = {
      size: dataPageSize,
      page: dataPageNumber,
      sort: dataSortParam,
      ...dataFilters,
    };

    const handleCancel = () => {
      if (action === 'create') {
        historyPush(MAIN_PATH, queryParams);
      } else {
        historyPush(`${MAIN_PATH}/${item.id}`);
      }
    };

    return (
      <ExampleForm
        {...otherProps}
        formData={action === 'create' ? {} : item}
        submitParams={action === 'create' ? { queryParams } : { id: item.id }}
        handleSubmit={action === 'create' ? createData : updateData}
        handleCancel={handleCancel}
        handleLanguageTextChange={this.handleLanguageTextChange}
      />
    );
  }
}

export default ExampleFormWrapper;

ExampleFormWrapper.propTypes = {
  dataPageSize: PropTypes.number,
  dataPageNumber: PropTypes.number,
  dataSortParam: PropTypes.string,
  dataFilters: formDataType,
  createData: PropTypes.func,
  updateData: PropTypes.func,
  action: PropTypes.string,
  item: formDataType,
};

ExampleFormWrapper.defaultProps = {
  dataPageSize: 25,
  dataPageNumber: 0,
  dataSortParam: 'id,ASC',
  dataFilters: {},
  createData: () => {},
  updateData: () => {},
  action: 'create',
  item: null,
};
