import { describe, expect, test } from '@jest/globals';
import orderSlice from '../services/slices/order';

describe('order slice', () => {
  const initialState = {
    orders: [],
    orderData: null,
    placedOrderData: null,
    orderRequest: false
  };

  describe('placeOrder actions', () => {
    test('should set orderRequest to true on placeOrder.pending', () => {
      const action = { type: 'orders/placeOrder/pending' };
      const state = orderSlice.reducer(initialState, action);
      expect(state.orderRequest).toBe(true);
    });

    test('should set orderRequest to false on placeOrder.fulfilled', () => {
      const action = {
        type: 'orders/placeOrder/fulfilled',
        payload: {
          _id: '1',
          name: 'Test Order',
          status: 'done',
          number: 1,
          ingredients: [],
          createdAt: '',
          updatedAt: ''
        }
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
    });

    test('should set orderRequest to false on placeOrder.rejected', () => {
      const action = { type: 'orders/placeOrder/rejected' };
      const state = orderSlice.reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
    });
  });
});
