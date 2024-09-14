import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "GET") {
    try {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", req.query.userId);

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching goals" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (method === "POST") {
    const { type, target_value } = body;

    if (!type || !target_value) {
      return res
        .status(400)
        .json({ message: "Goal type and target value are required" });
    }

    try {
      const { data, error } = await supabase
        .from("goals")
        .insert({ user_id: req.query.userId, type, target_value });

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating goal" });
      }

      return res.status(201).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (method === "PUT") {
    const { id, type, target_value } = body;

    if (!id || !type || !target_value) {
      return res
        .status(400)
        .json({ message: "Goal ID, type, and target value are required" });
    }

    try {
      const { data, error } = await supabase
        .from("goals")
        .update({ type, target_value })
        .eq("id", id);

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating goal" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (method === "DELETE") {
    const { id } = body;

    if (!id) {
      return res.status(400).json({ message: "Goal ID is required" });
    }

    try {
      const { data, error } = await supabase
        .from("goals")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting goal" });
      }

      return res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}