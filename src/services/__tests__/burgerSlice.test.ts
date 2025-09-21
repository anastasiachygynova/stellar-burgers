import reducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  orderBurger
} from '../burgerSlice';
import { TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: 'bun.png',
  image_mobile: 'bun_m.png',
  image_large: 'bun_l.png'
};

const main: TIngredient = {
  _id: 'main1',
  name: 'Котлета',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 5,
  calories: 150,
  price: 200,
  image: 'main.png',
  image_mobile: 'main_m.png',
  image_large: 'main_l.png'
};

describe('burgerSlice reducer', () => {
  it('should handle addIngredient for bun', () => {
    const state = reducer(initialState, addIngredient(bun));
    expect(state.constructorItems.bun).toMatchObject({
      _id: bun._id,
      type: 'bun'
    });
  });

  it('should handle addIngredient for non-bun', () => {
    const state = reducer(initialState, addIngredient(main));
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      _id: main._id,
      type: 'main'
    });
  });

  it('should handle removeIngredient', () => {
    const withMain = reducer(initialState, addIngredient(main));
    const idToRemove = withMain.constructorItems.ingredients[0].id;
    const afterRemove = reducer(withMain, removeIngredient(idToRemove));
    expect(afterRemove.constructorItems.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredientUp', () => {
    let state = reducer(initialState, addIngredient(main));
    const main2: TIngredient = { ...main, _id: 'main2', name: 'Котлета 2' };
    state = reducer(state, addIngredient(main2));
    const ids = state.constructorItems.ingredients.map((i) => i.id);
    const afterMove = reducer(state, moveIngredientUp(1));
    const movedIds = afterMove.constructorItems.ingredients.map((i) => i.id);
    expect(movedIds[0]).toBe(ids[1]);
    expect(movedIds[1]).toBe(ids[0]);
  });

  it('should handle moveIngredientDown', () => {
    let state = reducer(initialState, addIngredient(main));
    const main2: TIngredient = { ...main, _id: 'main2', name: 'Котлета 2' };
    state = reducer(state, addIngredient(main2));
    const ids = state.constructorItems.ingredients.map((i) => i.id);
    const afterMove = reducer(state, moveIngredientDown(0));
    const movedIds = afterMove.constructorItems.ingredients.map((i) => i.id);
    expect(movedIds[0]).toBe(ids[1]);
    expect(movedIds[1]).toBe(ids[0]);
  });

  it('should handle orderBurger pending', () => {
    const state = reducer(initialState, orderBurger.pending('req1', ['id1']));
    expect(state.loading).toBe(true);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle orderBurger fulfilled', () => {
    const state = reducer(
      initialState,
      orderBurger.fulfilled(
        {
          success: true,
          order: {
            _id: '1',
            status: 'done',
            name: 'Test Order',
            createdAt: '2023-01-01',
            updatedAt: '2023-01-01',
            number: 777,
            ingredients: []
          },
          name: 'Test Order'
        },
        'req1',
        ['id1']
      )
    );
    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orderModalData).toEqual({
      _id: '1',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      number: 777,
      ingredients: []
    });
    expect(state.constructorItems).toEqual({ bun: null, ingredients: [] });
  });

  it('should handle orderBurger rejected', () => {
    const state = reducer(
      initialState,
      orderBurger.rejected(new Error('fail'), 'req2', ['id2'])
    );
    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('fail');
  });
});
