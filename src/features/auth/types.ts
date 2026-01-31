export type AuthUser = {
  id: string;
  name: string;
};

export type AuthState = {
  user: AuthUser | null;
};
