/**
 * @author: leroy
 * @date: 2021/9/26 15:01
 * @description：homeSlice
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '@/store/services/user';
import { getUserInfo } from '@/store/services/user';

export interface UserState {
  userInfo: User;
}

const initialState: UserState = {
  userInfo: {},
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value) {
          state[key as keyof UserState] = value;
        }
      });
    },
  },
});

export const { save } = homeSlice.actions;

export const fetchUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (params: { auth: string }, { dispatch }) => {
    const data = await getUserInfo(params);
    dispatch(save({ userInfo: data }));
    return data;
  },
);

export default homeSlice.reducer;
