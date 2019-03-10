import * as types from '../actionTypes/data';

const initialState = {
  data: [],
  pagination: {
    size: 25, // default pagination size
    totalElements: 0,
    totalPages: 1,
    number: 0,
  },
  sort: {
    direction: 'ASC',
    ignoreCase: false,
    property: 'id',
  },
  filters: {},
  error: '',
  loading: '',
  adding: '',
  updating: '',
  deleting: '',
};

function getEmbedded(data) {
  if (data && Object.prototype.hasOwnProperty.call(data, '_embedded')) {
    const { _embedded } = data;
    return _embedded.foods;
  }
  return [];
}

function getPagination(data) {
  const { page } = data;
  return page && {
    totalElements: page.totalElements,
    totalPages: page.totalPages,
    number: page.number,
    size: page.size,
  };
}

function getSort(sort) {
  // sort=property,direction
  const splitedSort = sort.split(',');
  return {
    direction: splitedSort[1],
    property: splitedSort[0],
    ignoreCase: false,
  };
}

function updateSort(data) {
  return {
    direction: data.direction,
    property: data.property,
    ignoreCase: false,
  };
}

function createStateData(state, data) {
  const stateData = [...state.data];
  if (data && stateData) {
    stateData.push(data);
  }
  return stateData;
}

function updateStateData(state, data) {
  return state.data.map((d) => {
    if (d.id === data.id) {
      return data;
    }
    return d;
  });
}

function removeStateDataById(state, id) {
  return [...state.data.filter(item => item.id !== id)];
}

function incrementTotalElements(state) {
  const statePagination = { ...state.pagination };
  statePagination.totalElements += 1;
  return statePagination;
}

function decrementTotalElements(state) {
  const statePagination = { ...state.pagination };
  statePagination.totalElements -= 1;
  return statePagination;
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case types.DATA_GET:
      return {
        ...state,
        loading: action.loading,
      };
    case types.DATA_GET_SUCCESS:
      return {
        ...state,
        data: getEmbedded(action.data),
        pagination: getPagination(action.data),
        sort: getSort(action.sort),
        filters: action.filters,
        error: action.error,
        loading: action.loading,
      };
    case types.DATA_GET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    case types.DATA_RESET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.DATA_SORT_UPDATE:
      return {
        ...state,
        sort: updateSort(action.data),
      };
    case types.DATA_CREATE:
      return {
        ...state,
        adding: action.adding,
      };
    case types.DATA_CREATE_SUCCESS:
      return {
        ...state,
        data: createStateData(state, action.data),
        pagination: incrementTotalElements(state),
        error: action.error,
        adding: action.adding,
      };
    case types.DATA_CREATE_ERROR:
      return {
        ...state,
        error: action.error,
        adding: action.adding,
      };
    case types.DATA_UPDATE:
      return {
        ...state,
        updating: action.updating,
      };
    case types.DATA_UPDATE_SUCCESS:
      return {
        ...state,
        data: updateStateData(state, action.data),
        error: action.error,
        updating: action.updating,
      };
    case types.DATA_UPDATE_ERROR:
      return {
        ...state,
        error: action.error,
        updating: action.updating,
      };
    case types.DATA_DELETE:
      return {
        ...state,
        deleting: action.deleting,
      };
    case types.DATA_DELETE_SUCCESS:
      return {
        ...state,
        data: removeStateDataById(state, action.id),
        pagination: decrementTotalElements(state),
        error: action.error,
        deleting: action.deleting,
      };
    case types.DATA_DELETE_ERROR:
      return {
        ...state,
        error: action.error,
        deleting: action.deleting,
      };
    default:
      return state;
  }
};

export default data;

export function getData(state) {
  return state.data && state.data.data;
}

export function getDataPagination(state) {
  return state.data && state.data.pagination;
}

export function getDataPageNumber(state) {
  const pagination = getDataPagination(state);
  return (pagination && pagination.number) || 0;
}

export function getDataPageSize(state) {
  const pagination = getDataPagination(state);
  return (pagination && pagination.size) || 25;
}

export function getDataSort(state) {
  return state.data && state.data.sort;
}

export function getDataSortProperty(state) {
  const sort = getDataSort(state);
  return (sort && sort.property) || 'id';
}

export function getDataSortDirection(state) {
  const sort = getDataSort(state);
  return sort && sort.direction && sort.direction;
}

export function getDataSortParam(state) {
  return `${getDataSortProperty(state)},${getDataSortDirection(state)}`;
}

export function getDataFilters(state) {
  return state.data && state.data.filters;
}

export function getDataError(state) {
  return state.data && state.data.error;
}

export function getDataLoading(state) {
  return state.data && state.data.loading;
}

export function getDataAdding(state) {
  return state.data && state.data.adding;
}

export function getDataUpdating(state) {
  return state.data && state.data.updating;
}

export function getDataDeleting(state) {
  return state.data && state.data.deleting;
}
