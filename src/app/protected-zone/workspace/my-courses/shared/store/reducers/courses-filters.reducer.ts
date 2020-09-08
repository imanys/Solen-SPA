import {Action, createReducer, on} from '@ngrx/store';

import * as fromFilters from '../actions/courses-filters.actions';

import {
  LearnerCourseOrderByDto,
  LearnerCourseAuthorFilterDto,
  LearnerCoursesFilter
} from '../../../../../../models';


export interface State {
  orderBys: LearnerCourseOrderByDto[];
  authors: LearnerCourseAuthorFilterDto[];
  currentFilter: LearnerCoursesFilter;
  loaded: boolean;
  loading: boolean;
  error: any;
  orderByDefaultValue: number;
}

export const initialState: State = {
  orderBys: [],
  authors: [],
  currentFilter: null,
  loaded: false,
  loading: false,
  error: null,
  orderByDefaultValue: 0,
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
    const authors = filters.authorsFiltersList;
    const orderByDefaultValue = filters.orderByDefaultValue;

    const currentFilter: LearnerCoursesFilter = {
      authorId: '',
      orderBy: filters.orderByDefaultValue,
      page: 1,
      pageSize: 5
    };

    return {
      ...state,
      orderBys,
      authors,
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
    const currentFilter: LearnerCoursesFilter = {
      authorId: '',
      orderBy: state.orderByDefaultValue,
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
export const getAuthors = (state: State) => state.authors;
export const getCoursesFiltersLoaded = (state: State) => state.loaded;
export const getCurrentFilter = (state: State) => state.currentFilter;

