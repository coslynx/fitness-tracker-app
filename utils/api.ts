import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth].js';
import { supabase } from '@/lib/supabase';
import { goalSchema, progressSchema } from '@/utils/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        if (!req.query.goalId) {
          return res.status(400).json({ message: 'Goal ID is required' });
        }

        const { data, error } = await supabase
          .from('goals')
          .select('*')
          .eq('id', req.query.goalId)
          .single();

        if (error) {
          return res.status(500).json({ message: 'Error fetching goal' });
        }

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'POST':
      try {
        const { type, target_value } = body;

        const result = goalSchema.safeParse({ type, target_value });
        if (!result.success) {
          return res.status(400).json({ message: result.error.message });
        }

        const { data, error } = await supabase
          .from('goals')
          .insert({
            user_id: session.user.id,
            type,
            target_value,
          });

        if (error) {
          return res.status(500).json({ message: 'Error creating goal' });
        }

        return res.status(201).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PUT':
      try {
        const { id, type, target_value } = body;

        const result = goalSchema.safeParse({ type, target_value });
        if (!result.success) {
          return res.status(400).json({ message: result.error.message });
        }

        const { data, error } = await supabase
          .from('goals')
          .update({ type, target_value })
          .eq('id', id);

        if (error) {
          return res.status(500).json({ message: 'Error updating goal' });
        }

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      try {
        if (!req.query.goalId) {
          return res.status(400).json({ message: 'Goal ID is required' });
        }

        const { data, error } = await supabase
          .from('goals')
          .delete()
          .eq('id', req.query.goalId);

        if (error) {
          return res.status(500).json({ message: 'Error deleting goal' });
        }

        return res.status(200).json({ message: 'Goal deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'POST':
      try {
        const { goalId, current_value } = body;

        const result = progressSchema.safeParse({ goalId, current_value });
        if (!result.success) {
          return res.status(400).json({ message: result.error.message });
        }

        const { data, error } = await supabase
          .from('progress')
          .insert({ goal_id: goalId, current_value });

        if (error) {
          return res.status(500).json({ message: 'Error saving progress' });
        }

        return res.status(201).json({ message: 'Progress saved successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}