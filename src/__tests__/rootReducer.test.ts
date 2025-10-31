import { describe, expect, test } from '@jest/globals';
import { rootReducer } from '../services/store';

describe('rootReducer', () => {
  test('should properly initialize with combined reducers', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('feed');
  });
});
