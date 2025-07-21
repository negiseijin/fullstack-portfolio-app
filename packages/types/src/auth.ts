import type { User } from './user';

// Type for the session object returned by the API
export type SessionResponse = {
  user: User | null;
};

// Type for the sign-in response, which may include a redirect URL
export type SignInResponse = {
  url: string;
};

// Type for the sign-out response
export type SignOutResponse = {
  success: boolean;
};

// Supported OAuth providers
export const AuthProvider = {
  GITHUB: 'github',
  GOOGLE: 'google',
} as const satisfies Record<string, string>;
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];

// Request body for signing in with a provider
export type SignInRequest = {
  provider: AuthProvider;
};
