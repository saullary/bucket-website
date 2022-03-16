import Home from "./home";
import Login from "./login";
import HostingRoutes from "./hosting/routes";
import BucketRoutes from "./bucket/routes";
import Settings from "./settings";
import Overview from "./overview";

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    meta: {
      noLogin: true,
    },
  },
  {
    path: "/overview",
    component: Overview,
    meta: {
      title: "Overview",
    },
  },
  ...HostingRoutes,
  ...BucketRoutes,
  {
    path: "/settings",
    component: Settings,
    meta: {
      title: "Settings",
    },
  },
];
