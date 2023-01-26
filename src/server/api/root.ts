import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { workoutsRouter } from "./routers/workouts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  workouts: workoutsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
