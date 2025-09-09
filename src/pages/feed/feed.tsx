import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeedState, getFeeds } from '../../services//feedSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
