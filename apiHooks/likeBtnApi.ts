import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosclient";

export const useGetLikeCount = ({ slug }: { slug: string }) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosClient.get(`/like/${slug}`);
      return data;
    },
    queryKey: ["likeCount", slug],
    enabled: !!slug,
    initialData: { count: 0 },
  });
};

export const useIncressLikeCount = ({ slug }: { slug: string }) => {
  return useMutation({
    mutationFn: async ({ count }: { count: number }) => {
      const { data } = await axiosClient.post(`/like/${slug}`, { count });
      return data;
    },
  });
};
