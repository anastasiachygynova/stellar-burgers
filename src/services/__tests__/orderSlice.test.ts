import reducer, { getOrderByNumber } from '../orderSlice';

const initial = reducer(undefined, { type: 'INIT' } as { type: string });

describe('orderSlice async flow', () => {
  it('handles pending', () => {
    const state = reducer(initial, getOrderByNumber.pending('req1', 1));
    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const payload = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Test Order',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
          number: 42,
          ingredients: []
        }
      ]
    };
    const state = reducer(
      initial,
      getOrderByNumber.fulfilled(payload, 'req1', 1)
    );
    expect(state.request).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orderByNumberResponse).toEqual(payload.orders[0]);
  });

  it('handles rejected', () => {
    const state = reducer(
      initial,
      getOrderByNumber.rejected(new Error('nope'), 'req1', 1)
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe('nope');
  });
});
