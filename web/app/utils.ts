import { AuthTokenGetter, AuthTokenSetter } from "core/model";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

const ACCESS_TOKEN_COOKIE_NAME = "ACCESS_TOKEN";

export const getAccessToken: AuthTokenGetter = () => {
  const token = (cookies() as unknown as UnsafeUnwrappedCookies).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  return token || null;
};

export const setAccessToken: AuthTokenSetter = (token: string | null) => {
  if (token) {
    (cookies() as unknown as UnsafeUnwrappedCookies).set(ACCESS_TOKEN_COOKIE_NAME, token, { httpOnly: true });
  } else {
    (cookies() as unknown as UnsafeUnwrappedCookies).delete(ACCESS_TOKEN_COOKIE_NAME);
  }
};
