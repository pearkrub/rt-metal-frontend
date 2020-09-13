import store from "store2";
export default function isAuth({ next }) {
  if (!store.session.get("accessToken")) {
    return next({
      name: "login",
    });
  }

  return next();
}
