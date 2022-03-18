import Settings from "./settings";
import Collections from "./collections";
import Referral from "./referral";
import BugBounty from "./bug-bounty";

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
  {
    path: "/bug-bounty",
    component: BugBounty,
    meta: {
      title: "Bug Bounty",
    },
  },
];
