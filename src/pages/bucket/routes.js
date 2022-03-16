import Storage from "./storage";
import ARHistory from "./ar-history";
import Domains from "./domains";
import Domain from "./domain";

export default [
  {
    path: "/bucket/storage/*",
    component: Storage,
    meta: {
      title: "Storage",
    },
  },
  {
    path: "/bucket/arweave",
    component: ARHistory,
    meta: {
      title: "AR History",
    },
  },
  {
    path: "/bucket/arweave/*",
    component: Storage,
  },
  {
    path: "/bucket/domain",
    component: Domains,
    meta: {
      title: "Domains",
    },
  },
  {
    path: "/bucket/domain/:name",
    component: Domain,
  },
];
