import reducer, { getOrderByNumber } from '../orderSlice';

const initial = reducer(undefined, { type: 'INIT' } as any);

describe('orderSlice async flow', () => {
  it('handles pending', () => {
    const state = reducer(initial, getOrderByNumber.pending('req1', 1));
    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const payload = { orders: [{ number: 42 }] };
    const state = reducer(
      initial,
      getOrderByNumber.fulfilled(payload as any, 'req1', 1)
    );
    expect(state.request).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orderByNumberResponse).toEqual(payload.orders[0]);
  });

  it('handles rejected', () => {
    const state = reducer(
      initial,
      getOrderByNumber.rejected(new Error('nope') as any, 'req1', 1)
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe('nope');
  });
});
