export const isDev = () => {
  return import.meta.env.VITE_NODE_ENV === "development";
}