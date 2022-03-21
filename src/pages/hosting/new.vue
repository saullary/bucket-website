<template>
  <div>
    <e-steps :options="stepList" :value="curStep"></e-steps>
    <!-- <div class="main-wrap">new</div> -->
    <div class="mt-2">
      <new-step-0 />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepList: ["Import Repository", "Edit Configuration", "Start Deployment"],
      curStep: 0,
    };
  },
};
</script>