import Settings from "./settings";
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
      title: "Referral",
    },
  },
];
