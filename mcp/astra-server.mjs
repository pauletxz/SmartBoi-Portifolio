import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import OpenAI from "openai";
import { z } from "zod";

const MODEL = "gpt-6-astra";
const MAX_PROMPT_CHARACTERS = 16_000;
const MAX_CONTEXT_CHARACTERS = 12_000;

function toolError(message) {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}

function buildInput(prompt, context) {
  if (!context) {
    return prompt;
  }

  return `Contexto adicional fornecido pelo usuário:\n${context}\n\nPedido do usuário:\n${prompt}`;
}

function getSafeErrorMessage(error) {
  const status = error?.status;

  if (status === 401 || status === 403) {
    return "A chave da OpenAI não foi aceita. Revise OPENAI_API_KEY e reinicie o Antigravity.";
  }

  if (status === 429) {
    return "A OpenAI limitou esta consulta ou a conta não tem créditos disponíveis. Tente novamente em instantes.";
  }

  if (status === 400) {
    return "A OpenAI não aceitou esta consulta. Simplifique o pedido e tente novamente.";
  }

  return "Não foi possível consultar o GPT-6 Astra agora. Tente novamente em instantes.";
}

const server = new McpServer({
  name: "openai-astra",
  version: "1.0.0",
});

server.registerTool(
  "consultar_gpt6_astra",
  {
    title: "Consultar GPT-6 Astra",
    description:
      "Envia apenas o pedido e o contexto informados para a API da OpenAI e retorna a resposta do GPT-6 Astra. Não lê nem envia arquivos do projeto automaticamente.",
    inputSchema: z.object({
      prompt: z.string().trim().min(1).max(MAX_PROMPT_CHARACTERS).describe("Pergunta ou tarefa para o GPT-6 Astra."),
      context: z
        .string()
        .trim()
        .max(MAX_CONTEXT_CHARACTERS)
        .optional()
        .describe("Contexto opcional que também será enviado à OpenAI."),
      reasoning_effort: z
        .enum(["low", "medium", "high", "xhigh", "max"])
        .default("high")
        .describe("Profundidade de raciocínio. Valores maiores podem usar mais tempo e custo."),
    }),
    outputSchema: z.object({
      answer: z.string(),
      model: z.literal(MODEL),
    }),
  },
  async ({ prompt, context, reasoning_effort }) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return toolError(
        "OPENAI_API_KEY não está configurada para este servidor MCP. Defina a variável no ambiente do Antigravity e reinicie o aplicativo."
      );
    }

    try {
      const client = new OpenAI({
        apiKey,
        timeout: 60_000,
        maxRetries: 1,
      });
      const response = await client.responses.create({
        model: MODEL,
        input: buildInput(prompt, context),
        reasoning: { effort: reasoning_effort },
        max_output_tokens: 4_000,
        store: false,
      });
      const answer = response.output_text.trim();

      if (!answer) {
        return toolError("O GPT-6 Astra não retornou texto para esta consulta. Tente reformular o pedido.");
      }

      return {
        content: [{ type: "text", text: answer }],
        structuredContent: { answer, model: MODEL },
      };
    } catch (error) {
      const status = error && typeof error === "object" ? error.status : undefined;
      process.stderr.write(`[openai-astra] Consulta falhou${status ? ` (HTTP ${status})` : ""}.\n`);
      return toolError(getSafeErrorMessage(error));
    }
  }
);

const transport = new StdioServerTransport();

try {
  await server.connect(transport);
} catch {
  process.stderr.write("[openai-astra] Não foi possível iniciar o servidor MCP.\n");
  process.exitCode = 1;
}
