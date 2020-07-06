import store from "store2";
export default function isGuest({ next }) {
  if (store.session.get("accessToken")) {
    return next({
      name: "home",
    });
  }

  return next();
}
