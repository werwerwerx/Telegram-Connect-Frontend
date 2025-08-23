import { Navigate } from "react-router";
import { isTMA } from "@telegram-apps/sdk-react";
import { defaultLoader } from "~/shared/utils/loader";

export const loader = defaultLoader;

export const Entry = async () => {
  const isTelegramApp = await isTMA();
  
  if (isTelegramApp) {
    return <Navigate to="/tma/home" replace />;
  } else {
    return <Navigate to="/web/home" replace />;
  }
};