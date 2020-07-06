import Vue from "vue";
import VueRouter from "vue-router";
import isAuth from "../middleware/isAuth";
import isGuest from "../middleware/isGuest";
import views from "../views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: views.LoginPage,
    meta: {
      middleware: [isGuest],
    },
  },
  {
    path: "/home",
    name: "home",
    component: views.Home,
    meta: {
      middleware: [isAuth],
    },
  },

  {
    path: "/distributer-list",
    name: "distributer-list",
    component: views.DistributerList,
    meta: {
      middleware: [isAuth],
    },
  },
];

const router = new VueRouter({
  // mode: "history",
  base: "/",
  routes,
});
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
