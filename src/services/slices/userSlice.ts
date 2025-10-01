import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
  updateUserApi
} from '@api';
import { TTokens, TUser } from '@utils-types';

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginError: boolean;
  registerError: boolean;
  profileError: boolean;
  tokens: TTokens | null;
};

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  loginError: false,
  registerError: false,
  profileError: false,
  tokens: null
};

// Async thunks - объединяем из всех слайсов
export const login = createAsyncThunk('user/login', loginUserApi);
export const register = createAsyncThunk('user/register', registerUserApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);
export const update = createAsyncThunk('user/update', updateUserApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.loginError = false;
      state.registerError = false;
      state.profileError = false;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: (state) => state.isLoading,
    selectLoginError: (state) => state.loginError,
    selectRegisterError: (state) => state.registerError,
    selectProfileError: (state) => state.profileError,
    selectTokens: (state) => state.tokens
  },
  extraReducers: (builder) => {
    builder
      // Сначала все конкретные cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.loginError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loginError = false;
        state.tokens = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken
        };
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.loginError = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.registerError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.registerError = false;
        state.tokens = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken
        };
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.registerError = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.profileError = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.profileError = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.profileError = true;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.profileError = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.profileError = false;
      })
      .addCase(update.rejected, (state) => {
        state.isLoading = false;
        state.profileError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.loginError = false;
        state.registerError = false;
        state.profileError = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export const {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectLoginError,
  selectRegisterError,
  selectProfileError,
  selectTokens
} = userSlice.selectors;

export default userSlice;
