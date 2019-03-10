import React from 'react';

import PropTypes from 'prop-types';
import filterType from './types/filter';
import filtersValuesType from './types/filtersValues';

import { bemCls } from '../../utils/ClassNameHelpers';

import FilterText from './text/FilterText';
import FilterRange from './text/FilterRange';
import FilterSelect from './select/FilterSelect';
import FilterCheckbox from './checkbox/FilterCheckbox';
import FilterClearButton from './FilterClearButton';
import FilterSubmitButton from './FilterSubmitButton';

import './Filter.css';

const Filter = ({
  filters, filtersValues, className, serverSidedFiltering,
  handleFiltersChange, handleClearFilters, handleSubmitFilters, optionsFromData,
}) => (
  <form
    name="Filter"
    className={`Filter ${className}`}
    onSubmit={handleSubmitFilters}
  >
    <div className={bemCls(`Filter ${className}`, '__container')}>
      <div className="FilterInputs">
        {filters.map((filter) => {
          if (filter.range) {
            switch (filter.type) {
              case 'date':
              case 'datetime':
                // Here comes datepickers input field instead of text inputs
                return (
                  <FilterRange
                    key={filter.name}
                    filter={{ ...filter, type: 'date' }}
                    valueFrom={filtersValues[`${filter.name}From`]}
                    valueTo={filtersValues[`${filter.name}To`]}
                    handleFiltersChange={handleFiltersChange}
                    className={bemCls(className, 'Input')}
                  />
                );
              case 'number':
                return (
                  <FilterRange
                    key={filter.name}
                    filter={filter}
                    valueFrom={filtersValues[`${filter.name}From`]}
                    valueTo={filtersValues[`${filter.name}To`]}
                    handleFiltersChange={handleFiltersChange}
                    className={bemCls(className, 'Input')}
                  />
                );
              default:
                return null;
            }
          }

          switch (filter.type) {
            case 'date':
            case 'datetime':
              return (
                <FilterText
                  key={filter.name}
                  filter={{ ...filter, type: 'date' }}
                  value={filtersValues[filter.name]}
                  handleFiltersChange={handleFiltersChange}
                  className={bemCls(className, 'Input')}
                />
              );
            case 'text':
            case 'number':
              return (
                <FilterText
                  key={filter.name}
                  filter={filter}
                  value={filtersValues[filter.name]}
                  handleFiltersChange={handleFiltersChange}
                  className={bemCls(className, 'Input')}
                />
              );
            case 'select':
              return (
                <FilterSelect
                  key={filter.name}
                  filter={filter}
                  value={filtersValues[filter.name]}
                  handleFiltersChange={handleFiltersChange}
                  className={bemCls(className, 'Input')}
                  optionsFromData={optionsFromData}
                />
              );
            case 'checkbox':
              return (
                <FilterCheckbox
                  key={filter.name}
                  filter={filter}
                  value={filtersValues[filter.name]}
                  handleFiltersChange={handleFiltersChange}
                  className={bemCls(className, 'Input')}
                />
              );
            default:
              return null;
          }
        })}
      </div>
      <div className="FilterActions">
        {serverSidedFiltering
          && (
          <FilterSubmitButton
            handleSubmitFilters={handleSubmitFilters}
            className={bemCls(className, '__submitButton')}
          />
          )
        }
        <FilterClearButton
          handleClearFilters={handleClearFilters}
          className={bemCls(className, '__clearButton')}
        />
      </div>
    </div>
  </form>
);

export default Filter;

Filter.propTypes = {
  filters: PropTypes.arrayOf(filterType),
  filtersValues: filtersValuesType,
  // eslint-disable-next-line react/forbid-prop-types
  optionsFromData: PropTypes.object,
  className: PropTypes.string,
  serverSidedFiltering: PropTypes.bool,
  handleFiltersChange: PropTypes.func,
  handleClearFilters: PropTypes.func,
  handleSubmitFilters: PropTypes.func,
};

Filter.defaultProps = {
  filters: [{}],
  filtersValues: {},
  optionsFromData: null,
  className: '',
  serverSidedFiltering: true,
  handleFiltersChange: () => {},
  handleClearFilters: () => {},
  handleSubmitFilters: () => {},
};
