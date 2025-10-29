import { describe, expect, test } from '@jest/globals';
import ingredientsSlice from '../services/slices/ingredients';

const mockIngredients = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 200,
    image: 'image1.jpg',
    image_large: 'image1-large.jpg',
    image_mobile: 'image1-mobile.jpg'
  }
];

describe('ingredients slice', () => {
  const initialState = {
    items: undefined,
    isLoading: false,
    selectedIngredients: null,
    error: null
  };

  describe('fetchIngredients actions', () => {
    test('should set isLoading to true on fetchIngredients.pending', () => {
      const action = { type: 'ingredients/fetchIngredients/pending' };
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('should set data and isLoading to false on fetchIngredients.fulfilled', () => {
      const action = {
        type: 'ingredients/fetchIngredients/fulfilled',
        payload: mockIngredients
      };
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.items).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    test('should set error and isLoading to false on fetchIngredients.rejected', () => {
      const action = {
        type: 'ingredients/fetchIngredients/rejected',
        error: { message: 'Network error' }
      };
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      // Исправляем ожидание - используем сообщение из action
      expect(state.error).toBe('Network error');
    });
  });
});
