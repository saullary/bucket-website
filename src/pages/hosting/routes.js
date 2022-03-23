import New from "./new";
import Projects from "./projects";
import Project from "./project";
import Domains from "./domains";
import Statistics from "./statistics";
import StatisDetail from "./statistics-detail";

export default [
  {
    path: "/new",
    component: New,
    meta: {
      title: "New Project",
      subTitle: "3 easy steps to get your projects live",
      isTab: 1,
    },
  },
  {
    path: "/projects",
    component: Projects,
    meta: {
      title: "Projects",
      isTab: 1,
    },
  },
  {
    path: "/project/:projName/:id",
    component: Project,
    meta: {
      inProject: 1,
      isTab: 1,
      title: `{projName}`,
    },
  },
  {
    path: "/domains",
    component: Domains,
    meta: {
      title: "Domains",
    },
  },
  {
    path: "/statistics",
    component: Statistics,
    meta: {
      title: "Statistics",
    },
  },
  {
    path: "/statistics/:projName/:id",
    component: StatisDetail,
    meta: {
      title: "{projName} - Statistic",
    },
  },
].map((it) => {
  it.path = "/hosting" + it.path;
  it.meta.group = "Hosting";
  return it;
});
