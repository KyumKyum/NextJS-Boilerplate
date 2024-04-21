import { trpcServerClient } from '@/app/_trpc/trpcServerClient';

const greetings = async (): Promise<string> => {
    return await trpcServerClient.greeting();
};

export default greetings;
