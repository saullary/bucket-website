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
          text: "You Projects",
          comp: "s-hosting",
        },
        {
          text: "Your Bucket",
          comp: "s-bucket",
        },
      ],
    };
  },
};
</script>