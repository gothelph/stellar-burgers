import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  orders: TOrder[];
  error: string | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  error: null,
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const fetchFeed = createAsyncThunk<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>('feed/fetchFeed', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки ленты заказов';
      });
  }
});

export const selectOrders = (state: { feed: TFeedState }) => state.feed.orders;
export const selectTotal = (state: { feed: TFeedState }) => state.feed.total;
export const selectTotalToday = (state: { feed: TFeedState }) =>
  state.feed.totalToday;
export const selectIsLoading = (state: { feed: TFeedState }) =>
  state.feed.isLoading;

export default feedSlice;
