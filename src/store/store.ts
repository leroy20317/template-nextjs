/**
 * @author: leroy
 * @date: 2021/8/23 16:09
 * @description：store
 */
import type { ThunkAction, Action } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import seoReducer from './slices/seo';
import userReducer from './slices/user';
import loadingReducer from './slices/loading';

const combinedReducer = combineReducers({
  seo: seoReducer,
  user: userReducer,
  loading: loadingReducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return combinedReducer(nextState, action);
  }
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: AppState) => TSelected) => {
  return useSelector(selector, shallowEqual);
};

export const wrapper = createWrapper<AppStore>(makeStore);
