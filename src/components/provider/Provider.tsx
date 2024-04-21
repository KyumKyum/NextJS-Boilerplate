'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/app/_trpc/trpc_client';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

const Provider = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode => {
    const [queryClient] = React.useState(() => new QueryClient());
    const [trpcClient] = React.useState(() => {
        return trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/trpc`,
                    transformer: superjson,
                }),
            ],
        });
    });

    return (
        <trpc.Provider queryClient={queryClient} client={trpcClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};

export default Provider;
