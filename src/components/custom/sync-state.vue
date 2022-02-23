<template>
  <span class="sync-state" :class="'sta' + val">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    val: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    text() {
      return (
        ["Synced", "Syncing", "Timeout", "Failure"][this.val - 1] || "Desynced"
      );
    },
  },
};
</script>

<style lang="scss">
.sync-state {
  color: #7e8ea8;
  &.sta1 {
    color: #28aa91;
  }
  &.sta2 {
    color: #0f8dff;
  }
  &.sta3 {
    color: #ff8843;
  }
  &.sta4 {
    color: #ff5b60;
  }
}
</style>