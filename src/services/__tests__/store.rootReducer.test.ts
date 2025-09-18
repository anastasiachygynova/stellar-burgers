import store from '../store';

describe('rootReducer', () => {
  it('returns initial state on unknown action with undefined state', () => {
    const state = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' } as any);
    const stateAfter = store.getState();
    expect(stateAfter).toEqual(state);
  });
});
