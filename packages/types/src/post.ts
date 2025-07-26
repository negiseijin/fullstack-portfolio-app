import { z } from 'zod';
import type { User } from './user';

export type Tag = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  slug: string;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: User;
  tags: Tag[];
};

export const CreatePostSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200),
    content: z.string().min(1, 'Content is required'),
    excerpt: z.string().max(300).optional(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).max(10, 'You can add up to 10 tags').optional(),
    coverImage: z.url('Invalid URL').optional(),
  })
  .brand<'CreatePostSchema'>();

export type CreatePostRequest = z.infer<typeof CreatePostSchema>;

export const UpdatePostSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200).optional(),
    content: z.string().min(1, 'Content is required').optional(),
    excerpt: z.string().max(300).optional(),
    published: z.boolean().optional(),
    tags: z.array(z.string()).max(10, 'You can add up to 10 tags').optional(),
    coverImage: z.url('Invalid URL').optional(),
  })
  .brand<'UpdatePostSchema'>();

export type UpdatePostRequest = z.infer<typeof UpdatePostSchema>;
