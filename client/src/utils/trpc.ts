// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../server/src/infrastructure/interfaces/trpc/trpcService';

export const trpc = createTRPCReact<AppRouter>();
