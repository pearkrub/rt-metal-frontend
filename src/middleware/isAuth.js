import store from "store2";
export default function isAuth({ next }) {
  console.log("auth Session : " + store.session.get("accessToken"));
  if (!store.session.get("accessToken")) {
    return next({
      name: "login",
    });
  }

  return next();
}
