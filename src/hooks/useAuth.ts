// src/hooks/useAuth.ts
import { useAppSelector } from "@/app/redux/hooks";

export const useAuth = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  return {
    isAuthenticated,
    user,
    isLoading: false, 
  };
};