'use client';

import { trpc } from '@/app/_trpc/trpc_client';

export default function greetings(): string {
    const greeting = trpc.greeting.useQuery();
    return JSON.stringify(greeting.data);
}
