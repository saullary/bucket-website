import Home from "./home";
import Login from "./login";
import Storage from "./storage";
import ARHistory from "./ar-history";
import Domains from "./domains";
import Domain from "./domain";
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
  {
    path: "/storage/*",
    component: Storage,
    meta: {
      title: "Storage",
    },
  },
  {
    path: "/arweave",
    component: ARHistory,
    meta: {
      title: "AR History",
    },
  },
  {
    path: "/arweave/*",
    component: Storage,
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
    path: "/settings",
    component: Settings,
    meta: {
      title: "Settings",
    },
  },
];
