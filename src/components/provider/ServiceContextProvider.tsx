'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '@/app/_trpc/trpcClient';

const ServiceContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode => {
    const [queryClient] = React.useState(() => new QueryClient());
    const [client] = React.useState(trpcClient);

    return (
        <trpc.Provider queryClient={queryClient} client={client}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};

export default ServiceContextProvider;
