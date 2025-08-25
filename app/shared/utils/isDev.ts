export const isDev = () => {
  return import.meta.env.VITE_NODE === "dev";
}