
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app initialization
    dispatch(loadUser());
  }, [dispatch]);
};
