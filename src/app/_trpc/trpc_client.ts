import { type TrpcRouter } from '@/server/routes/trpc.routes';
import { createTRPCReact } from '@trpc/react-query';

//* createTRPCReact -> Next 13 app router compatible.
export const trpc = createTRPCReact<TrpcRouter>({});
