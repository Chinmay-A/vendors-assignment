import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Login with Google</button>
      )}
    </div>
  );
}
