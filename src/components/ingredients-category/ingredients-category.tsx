import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '@ui';
import { useSelector } from '../../services/store';
import { getConstructorState } from '../../services/burgerSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorState = useSelector(getConstructorState);

  const constructorItems = constructorState?.constructorItems || {
    bun: null,
    ingredients: []
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients: constructorIngredients } = constructorItems;
    const counters: { [key: string]: number } = {};

    constructorIngredients?.forEach((ingredient: TConstructorIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    if (bun) counters[bun._id] = 2;

    return counters;
  }, [constructorItems]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
