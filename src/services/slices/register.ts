import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUserApi } from '@api';

type TProfileState = {
  isError: boolean;
};

const initialState: TProfileState = {
  isError: false
};

export const register = createAsyncThunk('profile/register', registerUserApi);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  selectors: {
    selectIsError: (state) => state.isError
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isError = false;
      })
      .addCase(register.rejected, (state) => {
        state.isError = true;
      });
  }
});

export default registerSlice;
