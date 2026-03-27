import { cookies } from "next/headers";

export type UserRole = "admin" | "individual";

export const AUTH_COOKIE_NAME = "role";
export const EMAIL_COOKIE_NAME = "email";

export const isValidRole = (value: string | undefined): value is UserRole =>
  value === "admin" || value === "individual";

export const getRoleFromCookie = async (): Promise<UserRole | null> => {
  const cookieStore = await cookies();
  const role = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return isValidRole(role) ? role : null;
};

export const isAdmin = (value: string | undefined): boolean => value === "admin";
