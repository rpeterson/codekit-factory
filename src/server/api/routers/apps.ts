import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  //   protectedProcedure,
} from "@codekit/studio/server/api/trpc";

const api = publicProcedure;

export const appsRouter = createTRPCRouter({
  createApp: api
    .input(
      z.object({ name: z.string(), subdomain: z.string(), domain: z.string() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.app.create({
        data: {
          name: input.name,
          subdomain: input.subdomain,
          domain: input.domain,
        },
      });
    }),

  getAll: api.query(({ ctx }) => {
    return ctx.prisma.app.findMany();
  }),

  get: api.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.app.findFirstOrThrow({
      where: { id: input.id },
    });
  }),

  updateApp: api
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.app.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
});
