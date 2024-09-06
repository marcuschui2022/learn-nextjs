import {auth,} from "@/auth";

export default async function Page() {
    const session = await auth();

    if (session?.user?.role === "admin") {
        return <p>You are an admin, welcome {session.user.name}!</p>;
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return <p>Customers Page</p>
}