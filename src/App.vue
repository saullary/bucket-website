<template>
  <v-app>
    <e-header v-if="!meta.noLogin"></e-header>
    <e-drawer v-if="!meta.noLogin" />
    <v-main>
      <!-- <e-serach v-if="!meta.noLogin" /> -->
      <e-wrap>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </e-wrap>
    </v-main>

    <e-alert></e-alert>
  </v-app>
</template>

<script>
export default {
  computed: {
    meta() {
      return this.$route.meta || {};
    },
  },
};
</script>
