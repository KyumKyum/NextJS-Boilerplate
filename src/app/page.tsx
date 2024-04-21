import greetings from '@/app/_trpc/services/greetings';

export default async function Home() {
    const text = await greetings(); //* Supports Server Side Rendering

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className={'text-black'}>{text}</p>
        </main>
    );
}
