import { TokenResponse } from 'expo-auth-session';

export interface GoogleAuthResponse {
  type: 'error' | 'success';
  errorCode: string | null;
  error?: AuthError | null;
  params: Record<string, string>;
  authentication: TokenResponse | null;
  url: string;
}