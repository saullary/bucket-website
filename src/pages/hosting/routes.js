import New from "./new";
import Projects from "./projects";

export default [
  {
    path: "/hosting/new",
    component: New,
    meta: {
      title: "New Project",
      subTitle: "3 easy steps to get your projects live",
      isTab: 1,
    },
  },
  {
    path: "/hosting/projects",
    component: Projects,
    meta: {
      title: "Projects",
    },
  },
];
