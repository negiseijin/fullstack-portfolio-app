'use server';

import { type AppType, hc } from '@repo/api';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8787/';

export const client = hc<AppType>(baseURL, {
  init: {
    credentials: 'include',
  },
});
