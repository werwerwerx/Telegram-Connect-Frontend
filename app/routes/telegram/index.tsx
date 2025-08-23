import { useEffect, useState } from "react";
import { initializeTMA } from "~/shared/init-tma";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { TelegramShadcnThemeAdapt } from "~/shared/utils/telegram-shadcn-theme-adapt";
import i18n from "~/shared/i18n";
import { useNavigate } from "react-router";

export default function Index() {
  const [isTMAReady, setIsTMAReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    initializeTMA()
      .then(() => setIsTMAReady(true))
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    if (isTMAReady) {
      const launchParams = retrieveLaunchParams();
      if (launchParams) {
        TelegramShadcnThemeAdapt(launchParams);
        if (launchParams.tgWebAppData?.user?.language_code === "ru") {
          i18n.changeLanguage("ru");
        } else {
          i18n.changeLanguage("en");
        }
      }
      navigate("/home", {
        replace: true
      })
    }
  }, [isTMAReady]);

  if (error) {
    throw error;
  }

  if (!isTMAReady) {
    return <div className="animate-pulse text-center w-screen h-screen flex items-center justify-center">Загрузка...</div>;
  }

  return <div>TMA готов!</div>;
}
