import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/vendors");
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Login</h1>
      <button
        className="btn btn-danger"
        onClick={() => signIn("google")}
      >
        Login with Google
      </button>
    </div>
  );
}
