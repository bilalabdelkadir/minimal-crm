import * as z from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20).optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(7, { message: 'Password must be at least 7 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/\d/, { message: 'Password must contain at least one digit' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(7, { message: 'Password must be at least 7 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
