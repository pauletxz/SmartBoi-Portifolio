"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { leadSchema, type LeadInput } from "@/lib/validations/lead";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export function LeadCaptureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar os dados.");
      }

      setIsSuccess(true);
    } catch {
      setSubmitError("Nao foi possivel completar o cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-2xl text-center border border-[var(--border-soft)] w-full max-w-md"
      >
        <CheckCircle size={48} className="text-[var(--action-cta)] mb-4" />
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          Cadastro realizado com sucesso
        </h3>
        <p className="text-[var(--text-muted)]">
          Nossa equipe entrará em contato pelo WhatsApp em breve.
        </p>
      </motion.div>
    );
  }

  return (
    <div id="lead-form" className="w-full max-w-md bg-[var(--surface-light)] p-6 sm:p-8 rounded-2xl border border-[var(--border-soft)]">
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">
        Participe da construção do protótipo
      </h3>
      
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          {...register("name")}
          error={errors.name?.message}
        />
        
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          {...register("email")}
          error={errors.email?.message}
        />
        
        <Input
          label="WhatsApp com DDD"
          type="tel"
          placeholder="(11) 99999-9999"
          {...register("phone")}
          error={errors.phone?.message}
        />
        
        <Input
          label="Volume médio diário (litros)"
          type="number"
          placeholder="Ex: 500"
          {...register("daily_liters")}
          error={errors.daily_liters?.message}
        />

        <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
          Quero colaborar
        </Button>
        <p className="text-xs text-center text-[var(--text-muted)] mt-4">
          Usaremos seus dados somente para conversar sobre o protótipo.
        </p>
      </form>
    </div>
  );
}
