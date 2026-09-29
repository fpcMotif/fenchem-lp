import { c as t, s as n, g as o } from "./member-api-B494A4Zv.js";
import { M as c } from "./index-25pPz5MR.js";
const i = c((r, s) => ({
  accessToken: o() ?? "",
  nickname: "",
  avatarUrl: null,
  setAccessToken: (e) => {
    (n(e), r({ accessToken: e }));
  },
  setProfile: ({ nickname: e, avatarUrl: a }) => {
    r({ nickname: e, avatarUrl: a?.trim() ? a : null });
  },
  reset: () => {
    (t(), r({ accessToken: "", nickname: "", avatarUrl: null }));
  },
  isAuthenticated: () => !!s().accessToken,
}));
export { i as u };
