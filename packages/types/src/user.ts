import { z } from 'zod';

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const satisfies Record<string, string>;
export type Role = (typeof Role)[keyof typeof Role];

export type User = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  bio: string | null;
  githubUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  role: Role;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProfile = Pick<
  User,
  'id' | 'name' | 'image' | 'bio' | 'githubUrl' | 'twitterUrl' | 'linkedinUrl'
>;

export const UpdateUserProfileSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100).optional(),
    bio: z.string().max(500).optional(),
    githubUrl: z.url('Invalid GitHub URL').optional(),
    twitterUrl: z.url('Invalid Twitter URL').optional(),
    linkedinUrl: z.url('Invalid LinkedIn URL').optional(),
  })
  .brand<'UpdateUserProfileSchema'>();

export type UpdateUserProfileRequest = z.infer<typeof UpdateUserProfileSchema>;
