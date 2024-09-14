import { useSession } from "next-auth/react";
import { useStore } from "@/store/user";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import Button from "@/components/Button";
import SocialShareButton from "@/components/SocialShareButton";

const DashboardPage = () => {
  const { data: session } = useSession();
  const setUser = useStore((state) => state.setUser);
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (session?.user?.id) {
          const { data, error } = await supabase
            .from("goals")
            .select("*")
            .eq("user_id", session?.user.id);
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

  const handleLogout = async () => {
    try {
      await session?.user?.id;
      const { error } = await session?.user?.id;
      if (error) {
        console.error(error);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        {session && (
          <>
            <GoalInput />
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Your Goals</h2>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </>
        )}
        {goals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal: any) => (
              <div key={goal.id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold mb-2">{goal.type}</h2>
                <p className="text-gray-700 mb-4">
                  Target Value: {goal.target_value}
                </p>
                <ProgressChart goalId={goal.id} />
                <SocialShareButton
                  title={`My ${goal.type} goal progress!`}
                  url={`https://your-fitness-tracker.com/dashboard?goalId=${goal.id}`}
                />
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
    </div>
  );
};

export default DashboardPage;