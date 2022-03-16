<template>
  <v-app>
    <e-header v-if="!meta.noLogin"></e-header>
    <e-drawer v-if="!meta.noLogin" />
    <v-main>
      <!-- <e-serach v-if="!meta.noLogin" /> -->
      <div class="pa-5">
        <e-wrap class="main-wrap">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </e-wrap>
      </div>
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

<style lang="scss">
.main-wrap {
  background: #fff;
  box-shadow: 0 0 6px rgb(205 205 205 / 50%);
  min-height: 80vh;
}
</style>