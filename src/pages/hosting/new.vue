<style lang="scss">
.new-project {
  .v-window {
    overflow: visible;
  }
  .main-wrap {
    min-height: auto;
    padding: 20px;
  }
}
</style>

<template>
  <div class="new-project">
    <e-steps :options="stepList" :value="curStep"></e-steps>
    <!-- <div class="main-wrap">new</div> -->
    <v-window v-model="curStep" class="mt-4">
      <v-window-item v-for="i in [0, 1, 2]" :key="i" :value="i">
        <component :is="'new-step-' + i" />
      </v-window-item>
    </v-window>
    <div class="ta-r mt-3">
      <v-btn @click="curStep += 1">next</v-btn>
      <v-btn @click="curStep -= 1">Back</v-btn>
    </div>
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