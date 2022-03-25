<template>
  <div class="d-flex al-c fz-14">
    <label
      class="gray"
      :style="{
        'min-width': minWidth,
      }"
      >{{ label }}</label
    >
    <div class="ml-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    minWidth: {
      type: String,
      default: "100px",
    },
  },
};
</script>