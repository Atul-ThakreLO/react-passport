import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../Axios/axioInstance";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const responce = await axiosInstance.get("/auth", {
        withCredentials: true,
      });
      return responce.status;
    },
  });
};
