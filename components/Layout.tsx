import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import GoalInput from '@/components/GoalInput';
import ProgressChart from '@/components/ProgressChart';
import { supabase } from '@/lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (session?.user?.id) {
          const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', session?.user.id);
          if (error) {
            console.error(error);
          } else {
            setGoals(data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <div className="flex flex-col gap-4">
          {session && (
            <GoalInput />
          )}
          {goals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal: any) => (
                <div key={goal.id} className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-lg font-bold mb-2">{goal.type}</h2>
                  <p className="text-gray-700 mb-4">Target Value: {goal.target_value}</p>
                  <ProgressChart goalId={goal.id} />
                </div>
              ))}
            </div>
          )}
          {goals.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No goals yet.</p>
          )}
          {isLoading && (
            <p className="text-center text-gray-500">Loading goals...</p>
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <p className="text-center">© 2024 Fitness Tracker</p>
      </footer>
    </>
  );
};

export default Layout;