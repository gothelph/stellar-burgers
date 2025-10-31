import { describe, expect, test } from '@jest/globals';
import userSlice from '../services/slices/userSlice';

describe('user slice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    loginError: false,
    registerError: false,
    profileError: false,
    tokens: null
  };

  describe('login actions', () => {
    test('should set isLoading to true on login.pending', () => {
      const action = { type: 'user/login/pending' };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.loginError).toBe(false);
    });

    test('should set user data on login.fulfilled', () => {
      const action = {
        type: 'user/login/fulfilled',
        payload: {
          user: { email: 'test@example.com', name: 'Test User' },
          accessToken: 'token',
          refreshToken: 'refresh'
        }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user?.email).toBe('test@example.com');
      expect(state.isAuthenticated).toBe(true);
    });

    test('should set error on login.rejected', () => {
      const action = { type: 'user/login/rejected' };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.loginError).toBe(true);
    });
  });
});
