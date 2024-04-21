//* App Router Implementation (Fetch Adapter)
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { trpcRouter } from '@/server/routes/trpc.routes';

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: trpcRouter,
        createContext: () => ({}),
    });
export { handler as GET, handler as POST };
