// types.d.ts
import 'next-auth';

declare module 'next-auth' {
    interface User {
        role?: string | null;
    }

    interface Session {
        user: {
            role?: string | null;
            name?: string | null;
        };
    }

    interface JWT {
        role?: string | null;
    }
}