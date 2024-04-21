'use client';

import greetings from '@/app/_trpc/services/greetings';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className={'text-black'}>{greetings()}</p>
        </main>
    );
}
