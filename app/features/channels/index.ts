import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~/shared/api";

export const useChannels = () => {
  const getChannelsQuery = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      if(!api) {
        throw new Error("API is not initialized");
      }
      const response = await api.channels.get();
      return response.data?.data || [];
    },
    enabled: !!api,
  });

  return { getChannelsQuery };
}