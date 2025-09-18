import reducer, { getIngredients } from '../ingredientsSlice';

const initial = reducer(undefined, { type: 'INIT' } as any);

describe('ingredientsSlice async flow', () => {
  it('handles pending', () => {
    const state = reducer(initial, getIngredients.pending('req1'));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const payload = [{ _id: '1' }];
    const state = reducer(
      initial,
      getIngredients.fulfilled(payload as any, 'req1')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(payload);
  });

  it('handles rejected', () => {
    const state = reducer(
      initial,
      getIngredients.rejected(new Error('boom') as any, 'req1')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('boom');
  });
});
