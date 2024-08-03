import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../Axios/axioInstance";
import { Navigate, redirect } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationKey: "login",
    mutationFn: async (newUser) => {
      console.log(newUser);
      const response = await axiosInstance.post(`/signin?email=${newUser.email}&password=${newUser.password}`);
      return response.data; 
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: "login",
    //   });
    //   console.log("success");
    //   redirect("main");
    //   // Navigate("https://google.com")
    //   // <Navigate to="https://google.com" replace={true} />
    // },
  });
};
