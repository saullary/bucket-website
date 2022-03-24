<template>
  <div>
    <div class="main-wrap">
      <h3>Basic Configuration for doge-wallet</h3>
      <v-row>
        <v-col>
          <h4>Project Name</h4>
          <v-text-field persistent-placeholder outlined dense />
        </v-col>
        <v-col>
          <h4>Branch</h4>
          <v-select outlined dense :menu-props="{ offsetY: true }"> </v-select>
        </v-col>
      </v-row>
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