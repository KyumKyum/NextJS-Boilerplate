import { procedure, router } from '@/server/trpc_serv';
import { z } from 'zod';

// Add DB Connection Logic

export const trpcRouter = router({
    greeting: procedure.query(() => {
        return `Hello developer! Enjoy your development!`;
    }),
});

export type TrpcRouter = typeof trpcRouter;
