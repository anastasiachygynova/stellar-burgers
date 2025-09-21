import reducer, { getFeeds } from '../feedSlice';

const initial = reducer(undefined, { type: 'INIT' } as { type: string });

describe('feedSlice async flow', () => {
  it('handles pending', () => {
    const state = reducer(initial, getFeeds.pending('req1'));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const payload = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Test Order',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
          number: 1,
          ingredients: []
        }
      ],
      total: 10,
      totalToday: 2
    };
    const state = reducer(
      initial,
      getFeeds.fulfilled({ success: true, ...payload }, 'req1')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  it('handles rejected', () => {
    const state = reducer(initial, getFeeds.rejected(new Error('err'), 'req1'));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('err');
  });
});
