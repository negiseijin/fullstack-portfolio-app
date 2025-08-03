import { z } from 'zod';

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const satisfies Record<string, string>;
export type Role = (typeof Role)[keyof typeof Role];

export const UserSchema = z.object({
  id: z.cuid(),
  email: z.email(),
  name: z.string().nullable(),
  image: z.url().nullable(),
  bio: z.string().nullable(),
  githubUrl: z.url().nullable(),
  twitterUrl: z.url().nullable(),
  linkedinUrl: z.url().nullable(),
  role: z.enum(Role),
  emailVerified: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserProfileSchema = UserSchema.pick({
  id: true,
  name: true,
  image: true,
  bio: true,
  githubUrl: true,
  twitterUrl: true,
  linkedinUrl: true,
});

export const CreateUserSchema = z.object({
  email: z.email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(Role).default(Role.USER),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.email('Invalid email address').optional(),
  bio: z.string().max(500).optional(),
  githubUrl: z.url('Invalid GitHub URL').optional().or(z.literal('')),
  twitterUrl: z.url('Invalid Twitter URL').optional().or(z.literal('')),
  linkedinUrl: z.url('Invalid LinkedIn URL').optional().or(z.literal('')),
  role: z.enum(Role).optional(),
});

export const UserIdSchema = z.object({
  id: z.cuid('Invalid user ID'),
});

export type User = z.infer<typeof UserSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
