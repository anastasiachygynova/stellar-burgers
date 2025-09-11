import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { Params, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientState } from '../../services/ingredientsSlice';

type IngredientDetailsProps = {
  showHeading?: boolean;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  showHeading = true
}) => {
  const { ingredients } = useSelector(getIngredientState);
  const { id } = useParams<Params>();

  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {showHeading && (
        <h1
          className='text text_type_main-large'
          style={{ marginTop: 24, marginBottom: 16 }}
        >
          Детали ингредиента
        </h1>
      )}
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
