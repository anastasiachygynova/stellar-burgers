import reducer, { getFeeds } from '../feedSlice';

const initial = reducer(undefined, { type: 'INIT' } as any);

describe('feedSlice async flow', () => {
  it('handles pending', () => {
    const state = reducer(initial, getFeeds.pending('req1'));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const payload = { orders: [{ number: 1 }], total: 10, totalToday: 2 };
    const state = reducer(initial, getFeeds.fulfilled(payload as any, 'req1'));
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  it('handles rejected', () => {
    const state = reducer(
      initial,
      getFeeds.rejected(new Error('err') as any, 'req1')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('err');
  });
});
