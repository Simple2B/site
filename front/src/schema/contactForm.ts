import { z } from "zod";


export const ContactFormSchema = z.object({
    name: z.string().min(1).max(126),
    email: z.string().email().min(1).max(126),
    phone: z.number().min(1).refine((val) => {
      return val.toString().length < 14
    }),
    message: z.string().max(1024),
    surname: z.string().max(126),
    attachment: z.any(),
  });
export type TypeContactFormSchema = z.infer<typeof ContactFormSchema>;

export type InputData = Omit<TypeContactFormSchema, "attachment" | "surname" | "phone"> & {
  phone: string;
  candidate_uuid?: string };