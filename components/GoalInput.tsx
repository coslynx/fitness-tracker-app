import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface GoalInputProps {
  goalId?: number;
}

const GoalInput: React.FC<GoalInputProps> = ({ goalId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [goalType, setGoalType] = useState('weightloss');
  const [targetValue, setTargetValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (goalId) {
        // Update existing goal
        const { error } = await supabase
          .from('goals')
          .update({ type: goalType, target_value: targetValue })
          .eq('id', goalId);
        if (error) {
          console.error(error);
        }
      } else {
        // Create new goal
        const { error } = await supabase
          .from('goals')
          .insert({
            user_id: session?.user.id,
            type: goalType,
            target_value: targetValue,
          });
        if (error) {
          console.error(error);
        }
      }

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (goalId) {
        const { data, error } = await supabase
          .from('goals')
          .select('*')
          .eq('id', goalId)
          .single();
        if (error) {
          console.error(error);
        } else {
          setGoalType(data.type);
          setTargetValue(data.target_value);
        }
      }
    };

    fetchData();
  }, [goalId]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="goal-type" className="block text-gray-700 text-sm font-bold mb-2">
          Goal Type:
        </label>
        <select
          id="goal-type"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
        >
          <option value="weightloss">Weight Loss</option>
          <option value="distance">Distance Running</option>
          <option value="activity">Activity Level</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="target-value"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Target Value:
        </label>
        <input
          type="number"
          id="target-value"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : goalId ? 'Update Goal' : 'Create Goal'}
        </button>
      </div>
    </form>
  );
};

export default GoalInput;