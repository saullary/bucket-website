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
          text: "Billing",
          comp: "st-billing",
        },
        {
          text: "Tokens",
          comp: "st-tokens",
        },
      ],
    };
  },
};
</script>