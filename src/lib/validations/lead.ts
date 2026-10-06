import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Insira um e-mail valido."),
  phone: z.string().min(10, "Insira um numero de telefone valido com DDD."),
  farm_name: z.string().optional(),
  daily_liters: z.string().optional(),
  herd_size: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
