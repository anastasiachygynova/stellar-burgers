import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersAll, getUserState } from '../../services/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getOrdersAll());
  }, [dispatch]);

  return <ProfileOrdersUI orders={userOrders} />;
};
