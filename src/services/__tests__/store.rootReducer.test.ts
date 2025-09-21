import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../userSlice';
import constructorSlice from '../burgerSlice';
import feedSlice from '../feedSlice';
import ingredientSlice from '../ingredientsSlice';
import orderSlice from '../orderSlice';

const rootReducer = combineReducers({
  burgerConstructor: constructorSlice,
  ingredient: ingredientSlice,
  order: orderSlice,
  feed: feedSlice,
  user: userSlice
});

describe('rootReducer', () => {
  it('returns initial state on unknown action with undefined state', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as { type: string };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual({
      burgerConstructor: {
        loading: false,
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      ingredient: {
        ingredients: [],
        loading: false,
        error: null
      },
      order: {
        orders: [],
        orderByNumberResponse: null,
        request: false,
        responseOrder: null,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      user: {
        userData: null,
        request: false,
        response: null,
        registerData: null,
        isAuthenticated: false,
        isAuthChecked: false,
        loginUserRequest: false,
        userOrders: [],
        error: null
      }
    });
  });

  it('returns current state on unknown action with existing state', () => {
    const existingState = {
      burgerConstructor: {
        loading: true,
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      ingredient: {
        ingredients: [],
        loading: false,
        error: null
      },
      order: {
        orders: [],
        orderByNumberResponse: null,
        request: false,
        responseOrder: null,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      user: {
        userData: null,
        request: false,
        response: null,
        registerData: null,
        isAuthenticated: false,
        isAuthChecked: false,
        loginUserRequest: false,
        userOrders: [],
        error: null
      }
    };

    const unknownAction = { type: 'UNKNOWN_ACTION' } as { type: string };
    const state = rootReducer(existingState, unknownAction);

    expect(state).toEqual(existingState);
  });
});
