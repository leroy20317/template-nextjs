/*
 * @Author: leroy
 * @Date: 2024-10-31 11:23:01
 * @LastEditTime: 2025-01-20 10:08:00
 * @Description: SEO
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { NextSeoProps } from 'next-seo';

export type SEOState = Partial<{
  title: string;
  keywords: string;
  description: string;
  openGraph: Omit<NextSeoProps['openGraph'], 'url' | 'siteName' | 'title' | 'description'>;
}>;

const init = {
  title: '',
  keywords: '',
  description: '',
};

const initialState: SEOState = {
  title: '',
  keywords: '',
  description: '',
};

export const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Partial<SEOState>>) => {
      state.title = action.payload.title || init.title;
      state.keywords = action.payload.keywords || init.keywords;
      state.description = action.payload.description || init.description;
      state.openGraph = action.payload.openGraph || undefined;
    },
  },
});
export const { save: saveSEO } = seoSlice.actions;
export default seoSlice.reducer;
