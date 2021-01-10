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
    path: "/",
    name: "home-page",
    component: views.PurchaseList,
    meta: {
      middleware: [isAuth],
    },
  },
  {
    path: "/home",
    name: "home",
    component: views.PurchaseList,
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
  {
    path: "/product-list",
    name: "product-list",
    component: views.ProductList,
    meta: {
      middleware: [isAuth],
    },
  },
  {
    path: "/purchase-list",
    name: "purchase-list",
    component: views.PurchaseList,
    meta: {
      middleware: [isAuth],
    },
  },
  {
    path: "/purchase/:purchaseId",
    name: "purchase",
    component: views.PurchaseUpdate,
    meta: {
      middleware: [isAuth],
    },
  },
  {
    path: "/create-purchase",
    name: "create-purchase",
    component: views.CreatePurchase,
    meta: {
      middleware: [isAuth],
    },
  },
  {
    path: "/user",
    name: "user",
    component: views.UserList,
    meta: {
      middleware: [isAuth],
    },
  },
  {
    path: "/company-profile",
    name: "company-profile",
    component: views.CompanyProfile,
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
