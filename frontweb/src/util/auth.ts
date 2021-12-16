import { Role } from "types/role";
import { getTokenData } from "./token";

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
