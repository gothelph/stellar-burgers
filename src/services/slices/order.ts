import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TOrderState = {
  orders: TOrder[];
  orderData: TOrder | null;
  placedOrderData: TOrder | null;
  orderRequest: boolean;
};

const initialState: TOrderState = {
  orders: [],
  orderData: null,
  placedOrderData: null,
  orderRequest: false
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0];
  }
);

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearPlacedOrderData: (state) => {
      state.placedOrderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.orderRequest = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
      })
      // placeOrder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placedOrderData = action.payload;
        state.orderRequest = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const selectOrders = (state: { orders: TOrderState }) =>
  state.orders.orders;
export const selectOrderData = (state: { orders: TOrderState }) =>
  state.orders.orderData;
export const selectPlacedOrderData = (state: { orders: TOrderState }) =>
  state.orders.placedOrderData;
export const selectOrderRequest = (state: { orders: TOrderState }) =>
  state.orders.orderRequest;

export const { clearPlacedOrderData } = orderSlice.actions;

export default orderSlice;
