'use server';

import { type UpdateUserRequest, UpdateUserSchema } from '@repo/types';
import { revalidatePath } from 'next/cache';

import { client } from '@/lib/api';

export async function updateProfile(_prevState: UpdateUserRequest, formData: FormData) {
  try {
    const req = {
      name: formData.get('name'),
      bio: formData.get('bio'),
      githubUrl: formData.get('githubUrl'),
      twitterUrl: formData.get('twitterUrl'),
      linkedinUrl: formData.get('linkedinUrl'),
    };

    const validatedFields = UpdateUserSchema.safeParse(req);

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const res = await client.api.v1.profile.$patch({
      json: validatedFields.data,
    });

    if (!res.ok) {
      const error = await res.json();

      return { success: false, error: error.detail ?? 'Failed to update profile' };
    }

    revalidatePath('/profile');
    return { success: true, data: await res.json() };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
