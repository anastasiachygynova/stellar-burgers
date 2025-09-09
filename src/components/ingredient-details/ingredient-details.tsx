import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { Params, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientState } from '../../services/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector(getIngredientState);
  const { id } = useParams<Params>();

  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
