'use client';

import { UpdateUserSchema, type User, type z } from '@repo/types';
import { Button } from '@repo/ui/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { toast } from '@repo/ui/components/sonner';
import { Textarea } from '@repo/ui/components/textarea';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

import { updateProfile } from '@/app/profile/actions';

interface ProfileFormProps {
  user: User;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? 'Updating...' : 'Update profile'}
    </Button>
  );
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    data: user,
    error: undefined,
  });

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name ?? '',
      bio: user.bio ?? '',
      githubUrl: user.githubUrl ?? '',
      twitterUrl: user.twitterUrl ?? '',
      linkedinUrl: user.linkedinUrl ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      name: user.name ?? '',
      bio: user.bio ?? '',
      githubUrl: user.githubUrl ?? '',
      twitterUrl: user.twitterUrl ?? '',
      linkedinUrl: user.linkedinUrl ?? '',
    });
  }, [user, form]);

  useEffect(() => {
    if (state.success) {
      toast.success('Profile Updated', {
        description: 'Your profile has been updated successfully.',
      });
    } else if (state.error) {
      if (typeof state.error === 'string') {
        toast.error('Error', { description: state.error });
      } else {
        for (const [key, value] of Object.entries(state.error)) {
          const field = key as keyof z.infer<typeof UpdateUserSchema>;
          if (Object.keys(form.getValues()).includes(field)) {
            form.setError(field, {
              type: 'server',
              message: (value as string[]).join(', '),
            });
          }
        }
      }
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Tell us a little bit about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input placeholder="https://twitter.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
