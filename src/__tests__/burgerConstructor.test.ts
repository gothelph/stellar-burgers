import { describe, expect, test, jest } from '@jest/globals';
import burgerConstructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../services/slices/burger-constructor';

// Мокаем UUID для предсказуемых тестов
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-123')
}));

const mockIngredient = {
  _id: 'ingredient-1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 15,
  fat: 10,
  carbohydrates: 5,
  calories: 50,
  price: 100,
  image: 'ingredient.jpg',
  image_large: 'ingredient-large.jpg',
  image_mobile: 'ingredient-mobile.jpg'
};

describe('burgerConstructor slice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  test('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('ingredient-1');
  });

  test('should handle removeIngredient', () => {
    const addAction = addIngredient(mockIngredient);
    let state = burgerConstructorSlice.reducer(initialState, addAction);
    const ingredientId = state.ingredients[0].id;

    const removeAction = removeIngredient(ingredientId);
    state = burgerConstructorSlice.reducer(state, removeAction);

    expect(state.ingredients).toHaveLength(0);
  });

  test('should handle moveIngredient', () => {
    const ingredient1 = { ...mockIngredient, _id: '1' };
    const ingredient2 = { ...mockIngredient, _id: '2' };

    let state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );
    state = burgerConstructorSlice.reducer(state, addIngredient(ingredient2));

    const moveAction = moveIngredient({ fromIndex: 0, toIndex: 1 });
    state = burgerConstructorSlice.reducer(state, moveAction);

    expect(state.ingredients[0]._id).toBe('2');
    expect(state.ingredients[1]._id).toBe('1');
  });
});
