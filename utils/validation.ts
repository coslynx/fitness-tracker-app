import { z } from 'zod';

export const emailSchema = z.string().email({ message: 'Please enter a valid email address' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' });

export const goalSchema = z.object({
  type: z.enum(['weightloss', 'distance', 'activity']).default('weightloss'),
  target_value: z.number().min(1, { message: 'Target value must be at least 1' }),
});

export const workoutSchema = z.object({
  type: z.enum(['running', 'cycling', 'swimming', 'weightlifting']),
  duration: z.number().min(1, { message: 'Duration must be at least 1 minute' }),
  intensity: z.enum(['low', 'medium', 'high']),
});

export const progressSchema = z.object({
  goal_id: z.number().min(1, { message: 'Goal ID is required' }),
  current_value: z.number().min(0, { message: 'Current value must be at least 0' }),
});