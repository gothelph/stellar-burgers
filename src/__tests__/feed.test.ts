import { describe, expect, test } from '@jest/globals';
import feedSlice from '../services/slices/feed';

describe('feed slice', () => {
  const initialState = {
    orders: [],
    error: null,
    total: 0,
    totalToday: 0,
    isLoading: false
  };

  describe('fetchFeed actions', () => {
    test('should set isLoading to true on fetchFeed.pending', () => {
      const action = { type: 'feed/fetchFeed/pending' };
      const state = feedSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    test('should set data and isLoading to false on fetchFeed.fulfilled', () => {
      const action = {
        type: 'feed/fetchFeed/fulfilled',
        payload: {
          orders: [
            {
              _id: '1',
              name: 'Test',
              status: 'done',
              number: 1,
              ingredients: [],
              createdAt: '',
              updatedAt: ''
            }
          ],
          total: 100,
          totalToday: 10
        }
      };
      const state = feedSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toHaveLength(1);
      expect(state.total).toBe(100);
    });

    test('should set error and isLoading to false on fetchFeed.rejected', () => {
      const action = { type: 'feed/fetchFeed/rejected' };
      const state = feedSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ленты заказов');
    });
  });
});
