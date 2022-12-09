/* eslint-disable @typescript-eslint/ban-types */
// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@monorepo/server/src/infrastructure/interfaces/trpc/trpcService";

export const trpc = createTRPCReact<AppRouter>();
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
