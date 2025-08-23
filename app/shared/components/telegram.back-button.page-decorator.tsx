import { showBackButton, onBackButtonClick, hideBackButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const WithTelegramBackButton = ({children, back = false} : {children: React.ReactNode, back?: boolean}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigate(-1);
      });
    }
    hideBackButton();
  }, [back, navigate]);
  
  return <>
    {children}
  </>
}