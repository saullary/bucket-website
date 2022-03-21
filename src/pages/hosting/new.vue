<template>
  <div>
    <e-steps :options="stepList" :value="curStep"></e-steps>
    <div>new</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepList: ["Import Repository", "Edit Configuration", "Start Deployment"],
      curStep: 1,
    };
  },
};
</script>