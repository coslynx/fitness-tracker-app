import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const { data: session } = useSession();
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("progress")
          .select("*")
          .eq("goal_id", goalId)
          .order("created_at");
        if (error) {
          console.error(error);
        } else {
          setProgressData(data);
        }
      }
    };

    fetchProgressData();
  }, [goalId, session]);

  const chartData = {
    labels: progressData.map((data) =>
      new Date(data.created_at).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Progress",
        data: progressData.map((data) => data.current_value),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-64">
      {progressData.length > 0 && (
        <Line data={chartData} options={chartOptions} />
      )}
      {progressData.length === 0 && (
        <p className="text-center text-gray-500">No progress data yet.</p>
      )}
    </div>
  );
};

export default ProgressChart;