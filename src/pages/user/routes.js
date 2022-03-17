import Settings from "./settings";
import Referral from "./referral";

export default [
  {
    path: "/settings",
    component: Settings,
    meta: {
      title: "Settings",
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
