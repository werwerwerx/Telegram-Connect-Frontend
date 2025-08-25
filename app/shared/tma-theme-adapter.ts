import { bindThemeParamsCssVars, miniApp, setMiniAppHeaderColor } from "@telegram-apps/sdk-react"

export const tmaThemeAdapt = () => {
  // Creates CSS variables like:
  // --tg-bg-color: #aabbcc
  // --tg-header-color: #aabbcc

  setVar("--background", miniApp.backgroundColorRGB()!);
  setVar("--foreground", "var(--tg-text-color)");
  setVar("--card", "var(--tg-bg-color)");
  setVar("--card-foreground", "var(--tg-text-color)");
  setVar("--popover", "var(--tg-bg-color)");
  setVar("--popover-foreground", "var(--tg-text-color)");
    setVar("--primary", "var(--tg-button-color)");
    setVar("--primary-foreground", "var(--tg-button-text-color)");

    setTgLayoutColor();
}

// okay we nned to adapt css vars to shadcn
const setVar = (key: string, value: string) => {
  document.documentElement.style.setProperty(key, value, "important");
}

const setTgLayoutColor = () => {
  miniApp.setHeaderColor(miniApp.backgroundColorRGB()!);
  miniApp.setBottomBarColor(miniApp.backgroundColorRGB()!);
}