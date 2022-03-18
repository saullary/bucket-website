import Settings from "./settings";
import Collections from "./collections";
import Referral from "./referral";

export default [
  {
    path: "/settings",
    component: Settings,
    meta: {
      title: "Settings",
      wrapCls: "pa-0",
    },
  },
  {
    path: "/referral",
    component: Referral,
    meta: {
      title: "My Referral",
    },
  },
  {
    path: "/collections",
    component: Collections,
    meta: {
      title: "My Collection",
    },
  },
];
