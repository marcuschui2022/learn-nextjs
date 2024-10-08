import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                return isLoggedIn;
                // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        jwt({token, user}) {
            if (user) { // User is available during sign-in
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        session({session, token}) {
            session.user.id = token.id as string
            session.user.role = token.role as string;
            return session
        },
    },
    providers: [], // Add providers with an empty array for now
    logger: {
        error(code, ...message) {
            if (code.name !== 'CredentialsSignin') console.error(code, ...message);
        },
    },
} satisfies NextAuthConfig;