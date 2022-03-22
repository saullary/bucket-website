<template>
  <div>
    <e-settings :list="list" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          text: "Overview",
          comp: "proj-overview",
        },
        {
          text: "Deployments",
          comp: "proj-deployments",
        },
        {
          text: "Commits",
          comp: "proj-commits",
        },
        {
          text: "Settings",
          comp: "proj-settings",
        },
      ],
    };
  },
};
</script>