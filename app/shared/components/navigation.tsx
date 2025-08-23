import { useNavigate } from "react-router";
import { HomeIcon, Send, HandCoins } from "lucide-react";
import { Button } from "./ui-kit/button";
import { useTranslation } from "react-i18next";

export const Navigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex items-center justify-between">
      <div className="flex items-center justify-center">
        <Button onClick={() => navigate("/tma/home")} type="button" size="icon"> 
          {t('navigation.home')}
          <HomeIcon />
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => navigate("/tma/channels")} type="button" size="icon">
          {t('navigation.channels')}
          <Send />
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => navigate("/tma/advertisers")} type="button" size="icon">
          {t('navigation.advertisers')}
          <Send />
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => navigate("/tma/deals")} type="button" size="icon">
          {t('navigation.deals')}
          <HandCoins />
        </Button>
      </div>
    </div>
  );
}