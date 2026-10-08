import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres.").max(120),
  email: z.string().trim().email("Insira um e-mail válido.").max(254),
  phone: z.string().max(25).regex(/^[+\d\s().-]+$/, "Insira um telefone válido.").refine(value => /^(?:55)?[1-9]\d\d{8,9}$/.test(value.replace(/\D/g, "")), "Insira um telefone válido com DDD."),
  farm_name: z.string().trim().max(160).optional(),
  daily_liters: z.string().trim().refine(value => value === "" || (/^\d+(?:[.,]\d{1,2})?$/.test(value) && Number(value.replace(",", ".")) <= 10000000), "Informe um volume válido, maior ou igual a zero.").optional(),
  herd_size: z.string().regex(/^\d{0,7}$/).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
