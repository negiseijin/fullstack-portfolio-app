import { z } from 'zod';

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const satisfies Record<string, string>;
export type Role = (typeof Role)[keyof typeof Role];

const userId = z.cuid('Invalid user ID').describe('The unique identifier of the user');
const name = z.string().describe('user name');

export const UserIdSchema = z.object({
  id: userId,
});

export const UserSchema = z.object({
  id: userId,
  email: z.email(),
  name: name.nullable(),
  image: z.url().nullable(),
  bio: z.string().nullable(),
  githubUrl: z.url().nullable(),
  twitterUrl: z.url().nullable(),
  linkedinUrl: z.url().nullable(),
  role: z.enum(Role),
  emailVerified: z.string().date().nullable(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
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
  name: name.min(1, 'Name is required'),
  role: z.enum(Role).default(Role.USER),
});

export const UpdateUserSchema = z.object({
  name: name.min(1, 'Name is required').optional(),
  email: z.email('Invalid email address').optional(),
  bio: z.string().max(500).optional(),
  githubUrl: z.url('Invalid GitHub URL').optional().or(z.literal('')),
  twitterUrl: z.url('Invalid Twitter URL').optional().or(z.literal('')),
  linkedinUrl: z.url('Invalid LinkedIn URL').optional().or(z.literal('')),
  role: z.enum(Role).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
