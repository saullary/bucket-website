import Storage from "./storage";
import ARHistory from "./ar-history";
import Domains from "./domains";
import Domain from "./domain";

export default [
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
    meta: {
      title: "File - AR History",
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
    meta: {
      title: "{name}",
    },
  },
].map((it) => {
  it.path = "/bucket" + it.path;
  it.meta.group = "Bucket";
  return it;
});
