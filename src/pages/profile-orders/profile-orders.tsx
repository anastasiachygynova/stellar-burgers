import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersAll,
  getUserState,
  setUserOrders
} from '../../services/userSlice';
import { getCookie } from '../../utils/cookie';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector(getUserState);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(getOrdersAll());
  }, [dispatch]);

  const connectWebSocket = () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) return;
    const token = accessToken.replace('Bearer ', '');
    const WS_URL = `wss://norma.nomoreparties.space/orders?token=${token}`;

    try {
      const socket = new WebSocket(WS_URL);
      wsRef.current = socket;

      socket.onopen = () => {
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };

      socket.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.success && Array.isArray(data.orders)) {
            dispatch(setUserOrders(data.orders));
          }
        } catch (_error) {}
      };

      socket.onerror = (_error) => {};

      socket.onclose = (event) => {
        if (event.code !== 1000 && !reconnectTimeoutRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            connectWebSocket();
          }, 3000);
        }
      };
    } catch (_error) {}
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close(1000, 'Component unmounting');
      }
      wsRef.current = null;
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={userOrders} />;
};
