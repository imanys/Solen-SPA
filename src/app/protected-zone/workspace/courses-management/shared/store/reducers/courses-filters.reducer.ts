import {Action, createReducer, on} from '@ngrx/store';

import * as fromFilters from '../actions/courses-filters.actions';

import {
  CoursesManagementOrderByDto,
  LearningPathFilterDto,
  CoursesManagementAuthorFilterDto,
  StatusFilterDto, CoursesFilter
} from '../../../../../../models';


export interface State {
  orderBys: CoursesManagementOrderByDto[];
  learningPaths: LearningPathFilterDto[];
  authors: CoursesManagementAuthorFilterDto[];
  status: StatusFilterDto[];
  currentFilter: CoursesFilter;
  loaded: boolean;
  loading: boolean;
  error: any;
  orderByDefaultValue: number;
}

export const initialState: State = {
  orderBys: [],
  learningPaths: [],
  authors: [],
  status: [],
  currentFilter: null,
  loaded: false,
  loading: false,
  error: null,
  orderByDefaultValue: 0
};

const featureReducer = createReducer(
  initialState,
  on(fromFilters.loadCoursesFilters, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(fromFilters.loadCoursesFiltersSuccess, (state, {filters}) => {
    const orderBys = filters.orderByFiltersList;
    const learningPaths = filters.learningPathsFiltersList;
    const authors = filters.authorsFiltersList;
    const status = filters.statusFiltersList;
    const orderByDefaultValue = filters.orderByDefaultValue;

    const currentFilter: CoursesFilter = {
      authorId: '',
      learningPathId: '',
      orderBy: filters.orderByDefaultValue,
      statusId: 0,
      page: 1,
      pageSize: 5
    };

    return {
      ...state,
      orderBys,
      learningPaths,
      authors,
      status,
      currentFilter,
      orderByDefaultValue,
      loaded: true,
      loading: false
    };
  }),
  on(fromFilters.updateCurrentFilter, (state, {currentFilter}) => {
    return {
      ...state,
      currentFilter
    };
  }),
  on(fromFilters.resetCurrentFilter, (state) => {
    const currentFilter: CoursesFilter = {
      authorId: '',
      learningPathId: '',
      orderBy: state.orderByDefaultValue,
      statusId: 0,
      page: 1,
      pageSize: 5
    };
    return {
      ...state,
      currentFilter
    };
  }),
  on(fromFilters.loadCoursesFiltersFail, (state, {error}) => ({
    ...state,
    loaded: false,
    loading: false,
    error
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getOrderBys = (state: State) => state.orderBys;
export const getLearningPaths = (state: State) => state.learningPaths;
export const getAuthors = (state: State) => state.authors;
export const getStatus = (state: State) => state.status;
export const getCoursesFiltersLoaded = (state: State) => state.loaded;
export const getCurrentFilter = (state: State) => state.currentFilter;

