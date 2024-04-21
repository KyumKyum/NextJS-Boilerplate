import { type TrpcRouter } from '@/server/routes/trpc.routes';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

//* createTRPCReact -> Next 13 app router compatible.
export const trpc = createTRPCReact<TrpcRouter>({});
export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/trpc`,
            transformer: superjson,
        }),
    ],
});
