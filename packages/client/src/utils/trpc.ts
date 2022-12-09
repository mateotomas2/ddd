/* eslint-disable @typescript-eslint/ban-types */
// utils/trpc.ts
import { Todo } from "@monorepo/shared";
import { createTRPCReact } from "@trpc/react-query";
import {
  BuildProcedure,
  CombinedDataTransformer,
  CreateRouterInner,
  inferRouterInputs,
  inferRouterOutputs,
  RootConfig,
  unsetMarker,
} from "@trpc/server";
import type { AppRouter } from "@monorepo/server/src/infrastructure/interfaces/trpc/trpcService";

type AppRouterTEST = CreateRouterInner<
  RootConfig<{
    ctx: {};
    meta: {};
    errorShape: any;
    transformer: CombinedDataTransformer;
  }>,
  {
    todo: CreateRouterInner<
      RootConfig<{
        ctx: {};
        meta: {};
        errorShape: any;
        transformer: CombinedDataTransformer;
      }>,
      {
        onEventReceived: BuildProcedure<
          "subscription",
          {
            _config: RootConfig<{
              ctx: {};
              meta: {};
              errorShape: any;
              transformer: CombinedDataTransformer;
            }>;
            _meta: {};
            _ctx_out: {};
            _input_in: {
              aggregateId?: string;
            };
            _input_out: {
              aggregateId?: string;
            };
            _output_in: typeof unsetMarker;
            _output_out: typeof unsetMarker;
          },
          import("@trpc/server/observable").Observable<
            import("@monorepo/shared").EventTypeMapped,
            unknown
          >
        >;
        new: BuildProcedure<
          "mutation",
          {
            _config: RootConfig<{
              ctx: {};
              meta: {};
              errorShape: any;
              transformer: CombinedDataTransformer;
            }>;
            _meta: {};
            _ctx_out: {};
            _input_in: {
              id?: string;
              name?: string;
            };
            _input_out: {
              id?: string;
              name?: string;
            };
            _output_in: typeof unsetMarker;
            _output_out: typeof unsetMarker;
          },
          {
            id?: string;
            name?: string;
          }
        >;
        add: BuildProcedure<
          "mutation",
          {
            _config: RootConfig<{
              ctx: {};
              meta: {};
              errorShape: any;
              transformer: CombinedDataTransformer;
            }>;
            _meta: {};
            _ctx_out: {};
            _input_in: {
              aggregateId?: string;
              text?: string;
            };
            _input_out: {
              aggregateId?: string;
              text?: string;
            };
            _output_in: typeof unsetMarker;
            _output_out: typeof unsetMarker;
          },
          {
            aggregateId?: string;
            text?: string;
          }
        >;
        markDone: BuildProcedure<
          "mutation",
          {
            _config: RootConfig<{
              ctx: {};
              meta: {};
              errorShape: any;
              transformer: CombinedDataTransformer;
            }>;
            _meta: {};
            _ctx_out: {};
            _input_in: {
              aggregateId?: string;
              id?: string;
            };
            _input_out: {
              aggregateId?: string;
              id?: string;
            };
            _output_in: typeof unsetMarker;
            _output_out: typeof unsetMarker;
          },
          {
            aggregateId?: string;
            id?: string;
          }
        >;
        markUndone: BuildProcedure<
          "mutation",
          {
            _config: RootConfig<{
              ctx: {};
              meta: {};
              errorShape: any;
              transformer: CombinedDataTransformer;
            }>;
            _meta: {};
            _ctx_out: {};
            _input_in: {
              aggregateId?: string;
              id?: string;
            };
            _input_out: {
              aggregateId?: string;
              id?: string;
            };
            _output_in: typeof unsetMarker;
            _output_out: typeof unsetMarker;
          },
          {
            aggregateId?: string;
            id?: string;
          }
        >;
        onTodoListSnapshot: BuildProcedure<
          "subscription",
          {
            _config: RootConfig<{
              ctx: {};
              meta: {};
              errorShape: any;
              transformer: CombinedDataTransformer;
            }>;
            _meta: {};
            _ctx_out: {};
            _input_in: {
              aggregateId?: string;
            };
            _input_out: {
              aggregateId?: string;
            };
            _output_in: typeof unsetMarker;
            _output_out: typeof unsetMarker;
          },
          import("@trpc/server/observable").Observable<Todo[], unknown>
        >;
        onTodoListEvents: BuildProcedure<
          "subscription",
          {
            _config: RootConfig<{
              ctx: {};
              meta: {};
              errorShape: any;
              transformer: CombinedDataTransformer;
            }>;
            _meta: {};
            _ctx_out: {};
            _input_in: {
              aggregateId?: string;
            };
            _input_out: {
              aggregateId?: string;
            };
            _output_in: typeof unsetMarker;
            _output_out: typeof unsetMarker;
          },
          import("@trpc/server/observable").Observable<
            import("@monorepo/shared").EventTypeMapped[],
            unknown
          >
        >;
      }
    >;
  }
>;

export const trpc = createTRPCReact<AppRouterTEST>();
export type RouterInput = inferRouterInputs<AppRouterTEST>;
export type RouterOutput = inferRouterOutputs<AppRouterTEST>;
