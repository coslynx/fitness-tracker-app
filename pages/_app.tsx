import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/react/types";
import { useState, useEffect } from "react";
import { useStore } from "@/store/user";
import { supabase } from "@/lib/supabase";
import "@/styles/global.css";

interface AppProps {
  Component: React.ComponentType;
  pageProps: { [key: string]: any };
  session: Session | null;
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps, session }) => {
  const setUser = useStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.id) {
          setUser(session.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, setUser]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Loading...</p>
    </div>;
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;