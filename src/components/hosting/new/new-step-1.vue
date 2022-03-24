<template>
  <div>
    <div class="main-wrap">
      <h3>Basic Configuration for doge-wallet</h3>
      <div>
        {{ info }}
      </div>
    </div>
    <div class="ta-r mt-4">
      <v-btn color="primary" rounded @click="onDeploy">Deploy</v-btn>
      <v-btn rounded outlined class="ml-6" @click="$emit('back')">Back</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
  },
  methods: {
    onDeploy() {
      this.$emit("next");
    },
  },
};
</script>