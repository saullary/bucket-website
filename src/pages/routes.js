import Home from "./home";
import Login from "./login";
import Storage from "./storage";
import ARHistory from "./ar-history";
import ARDetail from "./ar-detail";
import Domains from "./domains";
import Domain from "./domain";
import Billing from "./billing";
import Settings from "./settings";
import Apikey from "./user/apikey";

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
    path: "/storage/*",
    component: Storage,
  },
  {
    path: "/ar-history",
    component: ARHistory,
    meta: {
      title: "AR History",
    },
  },
  {
    path: "/ar-file/:name/:id",
    component: ARDetail,
    meta: {
      title: "AR File Info",
    },
  },
  {
    path: "/domain",
    component: Domains,
    meta: {
      title: "Domains",
    },
  },
  {
    path: "/domain/:name",
    component: Domain,
  },
  {
    path: "/billing",
    component: Billing,
    meta: {
      title: "Billing",
    },
  },
  {
    path: "/settings",
    component: Settings,
    meta: {
      title: "Settings",
    },
  },
  {
    path: "/apikey",
    component: Apikey,
    meta: {
      title: "API Key",
    },
  },
];
