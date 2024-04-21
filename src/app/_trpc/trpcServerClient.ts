import { trpcRouter } from '@/server/routes/trpc.routes';
import { httpBatchLink } from '@trpc/client';

export const trpcServerClient = trpcRouter.createCaller({
    links: [
        httpBatchLink({
            url: `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/trpc`,
        }),
    ],
});
