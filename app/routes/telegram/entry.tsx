import {
  useLaunchParams,
  init,
  miniApp,
  mountViewport,
  bindViewportCssVars,
  bindThemeParamsCssVars,
  mountBackButton,
  restoreInitData,
  setDebug,
} from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router";
import { Suspense } from "react";
import { TelegramShadcnThemeAdapter } from "~/shared/components/telegram-shadcn-theme-adapter";
import i18n from "~/shared/i18n";

const LoadingFallback = () => {
  const { t } = useTranslation();
  return (
    <>
      <TelegramShadcnThemeAdapter />
      <div className="flex items-center justify-center h-screen">
        <h1 className="animate-pulse">{t("common.loading")}</h1>
      </div>
    </>
  );
};

const EntryContent = async () => {
  const launchParams = useLaunchParams();

  const userLang = (launchParams.initData as any)?.user?.language_code || 'ru';
  await i18n.changeLanguage(userLang);

  await init();
  mountBackButton.ifAvailable();
  restoreInitData();
  setDebug(true);

  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
    bindThemeParamsCssVars();
  }

  if (mountViewport.isAvailable()) {
    await mountViewport();
    bindViewportCssVars();
  }

  return <Navigate to="/tma/home" />;
};

export const Entry = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EntryContent />
    </Suspense>
  );
};