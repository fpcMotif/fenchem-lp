import { al as r, am as n, an as s } from "./index-25pPz5MR.js";
const a = "member_token",
  c = () => localStorage.getItem(a),
  b = (e) => localStorage.setItem(a, e),
  i = () => localStorage.removeItem(a),
  m = new Set(["member_unauthorized", "member_token_expired"]);
async function d(e) {
  try {
    return (await e.clone().json()).errorCode;
  } catch {
    return;
  }
}
const l = {
    async onRequest({ request: e }) {
      const t = c();
      return (t && e.headers.set("Authorization", `Bearer ${t}`), e);
    },
    async onResponse({ response: e }) {
      if (e.status === 401) {
        const t = await d(e);
        t && m.has(t) && i();
      }
      return e;
    },
  },
  o = r({ baseUrl: "/_api" });
o.use(l);
o.use(n);
o.use(s);
export { i as c, c as g, o as m, b as s };
