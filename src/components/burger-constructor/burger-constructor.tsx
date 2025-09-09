import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getUserState } from '../../services/userSlice';
import {
  getConstructorState,
  orderBurger,
  setRequest,
  resetModal
} from '../../services/burgerSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const constructorState = useSelector(getConstructorState);
  const constructorItems = constructorState?.constructorItems || {
    bun: null,
    ingredients: []
  };
  const orderModalData = constructorState?.orderModalData || null;
  const orderRequest = constructorState?.orderRequest || false;

  const isAuth = useSelector(getUserState).isAuthenticated;
  const dispatch = useDispatch();

  let arr: string[] = [];
  // Используем безопасный доступ к свойствам
  const ingredients = constructorItems.ingredients?.map((i) => i._id) || [];

  if (constructorItems.bun) {
    const bun = constructorItems.bun._id;
    arr = [bun, ...ingredients, bun];
  }

  const onOrderClick = () => {
    if (isAuth && constructorItems.bun) {
      dispatch(setRequest(true));
      dispatch(orderBurger(arr));
    } else if (isAuth && !constructorItems.bun) {
      return;
    } else if (!isAuth) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ) || 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
