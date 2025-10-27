import { ContactForm } from "@/components/ContactPage";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "./axiosclient";

export const useContactDataSave = () => {
  return useMutation({
    mutationFn: async (ContactFormData: ContactForm) => {
      const { data } = await axiosClient.post("/submit-form", ContactFormData);
      return data;
    },
  });
};
