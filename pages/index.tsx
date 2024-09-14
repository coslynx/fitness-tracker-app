import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Fitness Tracker
        </h2>
        <p className="text-center text-gray-500">
          Track your fitness goals and stay motivated.
        </p>
        <div className="flex items-center justify-center">
          <Link href="/login">
            <Button color="primary">Login</Button>
          </Link>
          <Link href="/signup">
            <Button color="secondary">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;