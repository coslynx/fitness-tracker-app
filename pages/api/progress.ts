import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { goalId, current_value } = req.body;

  if (!goalId || !current_value) {
    return res.status(400).json({ message: "Missing goal ID or current value" });
  }

  try {
    const { data, error } = await supabase
      .from("progress")
      .insert({ goal_id: goalId, current_value });

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error saving progress" });
    }

    return res.status(201).json({ message: "Progress saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}