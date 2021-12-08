import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = (): boolean => {
  const TokenData = getTokenData();

  return TokenData && TokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const TokenData = getTokenData();

  if (TokenData !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (TokenData.authorities.includes(roles[1])) {
        return true;
      }
    }

    // alternativa para logica: return roles.some(role => tokenData.authorities.includes(role));
  }

  return false;
};