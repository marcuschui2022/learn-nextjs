import 'next-auth';

declare module 'next-auth' {
    interface User {
        role?: string | null;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null;
        };
    }

    interface JWT {
        id: string;
        name?: string | null;
        email?: string | null;
        picture?: string | null;
        sub?: string;
        role?: string | null;
    }
}