interface OKLCH {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

const D65 = [0.95047, 1.0, 1.08883];

const labToXyz = (l: number, a: number, b: number): [number, number, number] => {
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;

  const xr = fx > 0.206897 ? fx ** 3 : (fx - 16 / 116) / 7.787;
  const yr = fy > 0.206897 ? fy ** 3 : (fy - 16 / 116) / 7.787;
  const zr = fz > 0.206897 ? fz ** 3 : (fz - 16 / 116) / 7.787;

  return [
    xr * D65[0],
    yr * D65[1],
    zr * D65[2]
  ];
};

const xyzToRgb = (x: number, y: number, z: number): [number, number, number] => {
  const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  const b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  return [r, g, b];
};

const gammaCorrection = (c: number): number => {
  const abs = Math.abs(c);
  if (abs > 0.0031308) {
    return Math.sign(c) * (1.055 * abs ** (1 / 2.4) - 0.055);
  }
  return c * 12.92;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const oklchToRgb = (l: number, c: number, h: number, alpha: number = 1): RGB => {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const [x, y, z] = labToXyz(l, a, b);
  const [r, g, b_rgb] = xyzToRgb(x, y, z);

  const r_corrected = gammaCorrection(r);
  const g_corrected = gammaCorrection(g);
  const b_corrected = gammaCorrection(b_rgb);

  return {
    r: clamp(Math.round(r_corrected * 255), 0, 255),
    g: clamp(Math.round(g_corrected * 255), 0, 255),
    b: clamp(Math.round(b_corrected * 255), 0, 255),
    alpha: clamp(alpha, 0, 1)
  };
};

export const oklchToRgbString = (l: number, c: number, h: number, alpha: number = 1): string => {
  const rgb = oklchToRgb(l, c, h, alpha);
  
  if (alpha === 1) {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.alpha})`;
};

export const oklchToHex = (l: number, c: number, h: number, alpha: number = 1): string => {
  const rgb = oklchToRgb(l, c, h, alpha);
  
  const toHex = (value: number): string => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  
  if (alpha === 1) {
    return hex;
  }
  
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return hex + alphaHex;
};

export const parseOklch = (oklchString: string): { l: number; c: number; h: number; alpha?: number } | null => {
  const match = oklchString.match(/oklch\(([^)]+)\)/);
  if (!match) return null;
  
  const values = match[1].split(/\s+/).map(v => v.trim());
  if (values.length < 3) return null;
  
  const l = parseFloat(values[0]);
  const c = parseFloat(values[1]);
  const h = parseFloat(values[2]);
  const alpha = values[3] ? parseFloat(values[3]) : 1;
  
  if (isNaN(l) || isNaN(c) || isNaN(h)) return null;
  
  return { l, c, h, alpha };
};

export const oklchStringToRgb = (oklchString: string): RGB | null => {
  const parsed = parseOklch(oklchString);
  if (!parsed) return null;
  
  return oklchToRgb(parsed.l, parsed.c, parsed.h, parsed.alpha);
};
