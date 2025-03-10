// src/app/actions/auth.ts
"use client";

import { logout } from "@/app/redux/slices/authSlice";
import {store} from "@/app/redux/store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  
  const handleLogout = () => {
    store.dispatch(logout());
    router.push("/login");
  };
  
  return handleLogout;
};