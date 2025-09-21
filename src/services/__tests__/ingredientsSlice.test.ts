import reducer, { getIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const initial = reducer(undefined, { type: 'INIT' } as { type: string });

describe('ingredientsSlice async flow', () => {
  it('handles pending', () => {
    const state = reducer(initial, getIngredients.pending('req1'));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const payload: TIngredient[] = [
      {
        _id: '1',
        name: 'Test Ingredient',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 15,
        calories: 100,
        price: 100,
        image: 'test.jpg',
        image_large: 'test-large.jpg',
        image_mobile: 'test-mobile.jpg'
      }
    ];
    const state = reducer(initial, getIngredients.fulfilled(payload, 'req1'));
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(payload);
  });

  it('handles rejected', () => {
    const state = reducer(
      initial,
      getIngredients.rejected(new Error('boom'), 'req1')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('boom');
  });
});
