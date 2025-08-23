import { useEffect } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";

interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

const hexToOklch = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  
  if (max === min) {
    return `oklch(${l} 0 0)`;
  }
  
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
  let h = 0;
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
  }
  h /= 6;
  
  return `oklch(${l} ${s} ${h * 360})`;
};

const applyTelegramTheme = (theme: TelegramThemeParams) => {
  const root = document.documentElement;
  
  if (theme.bg_color) {
    root.style.setProperty('--background', hexToOklch(theme.bg_color));
    root.style.setProperty('--card', hexToOklch(theme.bg_color));
    root.style.setProperty('--popover', hexToOklch(theme.bg_color));
  }
  
  if (theme.text_color) {
    root.style.setProperty('--foreground', hexToOklch(theme.text_color));
    root.style.setProperty('--card-foreground', hexToOklch(theme.text_color));
    root.style.setProperty('--popover-foreground', hexToOklch(theme.text_color));
  }
  
  if (theme.hint_color) {
    root.style.setProperty('--muted-foreground', hexToOklch(theme.hint_color));
  }
  
  if (theme.button_color) {
    root.style.setProperty('--primary', hexToOklch(theme.button_color));
    root.style.setProperty('--accent', hexToOklch(theme.button_color));
  }
  
  if (theme.button_text_color) {
    root.style.setProperty('--primary-foreground', hexToOklch(theme.button_text_color));
    root.style.setProperty('--accent-foreground', hexToOklch(theme.button_text_color));
  }
  
  if (theme.secondary_bg_color) {
    root.style.setProperty('--secondary', hexToOklch(theme.secondary_bg_color));
    root.style.setProperty('--muted', hexToOklch(theme.secondary_bg_color));
  }
  
  if (theme.link_color) {
    root.style.setProperty('--ring', hexToOklch(theme.link_color));
  }
  
  const isDark = theme.bg_color && parseInt(theme.bg_color.slice(1), 16) < 0x808080;
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const resetToDefaultTheme = () => {
  const root = document.documentElement;
  
  root.style.removeProperty('--background');
  root.style.removeProperty('--foreground');
  root.style.removeProperty('--card');
  root.style.removeProperty('--card-foreground');
  root.style.removeProperty('--popover');
  root.style.removeProperty('--popover-foreground');
  root.style.removeProperty('--primary');
  root.style.removeProperty('--primary-foreground');
  root.style.removeProperty('--secondary');
  root.style.removeProperty('--muted');
  root.style.removeProperty('--muted-foreground');
  root.style.removeProperty('--accent');
  root.style.removeProperty('--accent-foreground');
  root.style.removeProperty('--ring');
  
  document.documentElement.classList.remove('dark');
};

export const TelegramShadcnThemeAdapter = () => {
  const launchParams = useLaunchParams();
  
  useEffect(() => {
    const themeParams = launchParams.themeParams;
    
    if (themeParams) {
      applyTelegramTheme(themeParams);
    } else {
      resetToDefaultTheme();
    }
    
    return () => {
      resetToDefaultTheme();
    };
  }, [launchParams.themeParams]);
  
  return null;
};
