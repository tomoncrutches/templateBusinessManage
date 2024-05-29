import { Login } from '@/types/user.types';
import { create } from 'zustand';
import { decode } from 'jsonwebtoken';
import { signin } from '@/services/auth.service';
import { toAPI } from '@/lib/utils';

interface UserStore {
  id: string | null;
  username: string | null;
  name: string | null;
  verifySession: (token: string) => Promise<boolean>;
  login: (
    userdata: Login,
  ) => Promise<{ access_token: string; exp: number } | undefined>;
  logout: () => void;
}

type DecodedToken = {
  sub: string;
  username: string;
  name: string;
  exp: number;
};
export const authStore = create<UserStore>((set) => ({
  id: null,
  username: null,
  name: null,

  verifySession: async (token: string) => {
    const result = await toAPI({
      method: 'POST',
      route: 'auth/verify',
      headers: { Authorization: `Bearer ${token}` },
    });
    if ('statusCode' in result) return false;

    const { isValid } = result as { isValid: boolean };
    if (isValid) {
      const { sub, name, username } = decode(token) as DecodedToken;
      set(() => ({ id: sub, username, name }));
      return true;
    }
    return false;
  },

  login: async (userdata: Login) => {
    const { access_token } = await signin(userdata);
    if (access_token) {
      const { sub, name, username, exp } = decode(access_token) as DecodedToken;
      set(() => ({ id: sub, username, name }));

      return { access_token, exp };
    }
  },

  logout: () => {
    set(() => ({ id: null, username: null, name: null }));
  },
}));
