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
          text: "Hosting",
          comp: "s-hosting",
        },
        {
          text: "Bucket",
          comp: "s-bucket",
        },
      ],
    };
  },
};
</script>