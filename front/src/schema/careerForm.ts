import { FILE_SIZE_LIMIT } from "@/types/contacts";
import { z } from "zod";




export const careerFormSchema = z.object({
    name: z.string().min(1).max(126),
    email: z.string().email().min(1).max(126),
    phone: z.number().min(1).refine((val) => {
      return val.toString().length < 14
    }),
    message: z.string().min(1).max(1024),
    attachment: z.any(),
  });
export type TypeCareerFormSchema = z.infer<typeof careerFormSchema>;

export type CarrerInputData = Omit<TypeCareerFormSchema, "attachment" | "surname" | "phone"> & {
  phone: string;
  candidate_uuid?: string };