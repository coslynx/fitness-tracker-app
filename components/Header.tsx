import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await session?.user?.id;
      const { error } = await session?.user.id;
      if (error) {
        console.error(error);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Fitness Tracker</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {session && (
              <>
                <li>
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/goals">
                    Goals
                  </Link>
                </li>
                <li>
                  <Link href="/workouts">
                    Workouts
                  </Link>
                </li>
                <li>
                  <Button onClick={handleLogout}>
                    Logout
                  </Button>
                </li>
              </>
            )}
            {!session && (
              <>
                <li>
                  <Link href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;